import { Logger } from '@azure/functions';
import { GraphClient } from '@harmonie/graph-client';
import { SubscriptionModel, UserModel } from '@harmonie/db';
import { getNewAccessToken, recursiveWithUsers } from '../../shared';

const { subscriptionInterval } = process.env;
const INTERVAL = +(subscriptionInterval || 86400000) * 2.5;

type SubscriptionParams = {
  changeType: string;
  resource: string;
  notificationUrl: string;
};

const getGraphSubscription = async (subscriptionId: string, ownerId: string) => {
  try {
    const owner = (await UserModel.findOne({ userId: ownerId })) as any;
    return await recursiveWithUsers(token => new GraphClient(token).getSubscription(subscriptionId), [owner]);
  } catch (error) {
    return null;
  }
};

const isOwner = async (mailboxId: string, ownerId: string) => {
  const owner = (await UserModel.findOne({ userId: ownerId })) as any;
  const { refreshToken, redirectUri, tenantId } = owner;
  const token = await getNewAccessToken(refreshToken, redirectUri, tenantId);
  return await new GraphClient(token).isOwner(mailboxId);
};

const isExpired = (dbSubscription: any, graphSubscription: any) => {
  return (
    dbSubscription?.expirationDateTime &&
    graphSubscription?.expirationDateTime &&
    new Date(dbSubscription.expirationDateTime).getTime() < new Date(graphSubscription.expirationDateTime).getTime()
  );
};

const recurseCreateGraphSubscription = async (
  subscription: SubscriptionParams,
  ownerIds: any[],
  onError?: (error: Error, userId: string) => Promise<any>
) => {
  const owners = (await UserModel.find({ userId: ownerIds })) as any[];
  if (!owners || !owners.length) {
    throw new Error(`Owners '${ownerIds.join()}' not found in database.`);
  }

  const { changeType, resource, notificationUrl } = subscription;
  const newSubscription = {
    changeType,
    resource,
    notificationUrl,
    lifecycleNotificationUrl: notificationUrl,
    expirationDateTime: new Date(INTERVAL + new Date().getTime()).toISOString(),
  };
  return await recursiveWithUsers(token => new GraphClient(token).createSubscribe(newSubscription), owners, onError);
};

const createDbSubscription = async (mailboxId: string, ownerIds: string[], graphSubscription: any) => {
  const newSubscription = {
    ownerIds,
    // ownerId is deprecated, will be removed
    ownerId: ownerIds[0],
    mailboxId,
    expirationDateTime: graphSubscription.expirationDateTime,
    subscriptionId: graphSubscription.id,
    resource: graphSubscription.resource,
    changeType: graphSubscription.changeType,
    notificationUrl: graphSubscription.notificationUrl,
  };
  return await SubscriptionModel.create(newSubscription);
};

const reCreateGraphSubscription = async (
  dbSubscription: any,
  subscription: any,
  ownerIds: any[],
  ownerId: string,
  mailboxId: string,
  logger: Logger
) => {
  logger.warn(
    `[subscription-create] Graph subscription ${dbSubscription.subscriptionId} for mailbox ${mailboxId} not exist, re-creating subscription.`
  );

  dbSubscription.isDeleted = true;
  await dbSubscription.save();

  const graphSubscription = await recurseCreateGraphSubscription(subscription, ownerIds, async (e, userId) => {
    ownerIds = ownerIds.filter(o => o === userId);
    logger.warn(
      `[subscription-create] Owner ${userId} was removed from subscription ${graphSubscription.id} for mailbox ${mailboxId}.`
    );
  });

  if (graphSubscription) {
    logger.info(`[subscription-create] Graph subscription ${graphSubscription.id} for mailbox ${mailboxId} created.`);
    ownerIds = ownerIds.includes(ownerId) ? ownerIds : [...(ownerIds || []), ownerId];
    logger.info(
      `[subscription-create] Owner ${ownerId} was added to subscription ${graphSubscription.id} for mailbox ${mailboxId}.`
    );
    dbSubscription = await createDbSubscription(mailboxId, ownerIds, graphSubscription);
  } else {
    logger.warn(
      `[subscription-create] Owners of subscription ${graphSubscription.id} for mailbox ${mailboxId} failed to created new one.`
    );
  }

  return dbSubscription;
};

const updateExpiration = async (dbSubscription: any, graphSubscription: any, logger: Logger) => {
  const expired = isExpired(dbSubscription, graphSubscription);

  if (expired) {
    dbSubscription.expirationDateTime = graphSubscription.expirationDateTime;
    dbSubscription.save();
    logger.info(`[subscription-create] DB subscription ${graphSubscription.id} updated.`);
  }

  return dbSubscription;
};

export const create = async (mailboxId: string, ownerId: string, subscription: any, logger: Logger): Promise<any> => {
  const mailbox = mailboxId.toLowerCase();

  let graphSubscription;
  let dbSubscription = (await SubscriptionModel.findOne({
    mailboxId: mailbox,
    isDeleted: false,
    resource: subscription.resource,
  })) as any;

  if (!dbSubscription) {
    graphSubscription = await recurseCreateGraphSubscription(subscription, [ownerId]);

    if (graphSubscription) {
      dbSubscription = await createDbSubscription(mailbox, [ownerId], graphSubscription);
      logger.info(`[subscription-create] Subscription ${graphSubscription.id} for mailbox ${mailbox} created.`);
    }
  } else {
    try {
      // workaround: looks like users can get other users subscriptions
      await isOwner(mailbox, ownerId);
    } catch (e) {
      return;
    }

    graphSubscription = await getGraphSubscription(dbSubscription.subscriptionId, ownerId);

    const { ownerIds } = dbSubscription;
    if (!graphSubscription) {
      dbSubscription = await reCreateGraphSubscription(
        dbSubscription,
        subscription,
        ownerIds,
        ownerId,
        mailbox,
        logger
      );
    } else if (!ownerIds.includes(ownerId)) {
      dbSubscription.ownerIds = [...(ownerIds || []), ownerId];
      await dbSubscription.save();
      logger.info(
        `[subscription-create] Owner ${ownerId} added to subscription ${graphSubscription.id} for mailbox ${mailbox}.`
      );
    } else {
      logger.warn(
        `[subscription-create] Graph subscription ${graphSubscription.id} for mailbox ${mailbox} already exist.`
      );
    }
  }

  dbSubscription = await updateExpiration(dbSubscription, graphSubscription, logger);
  return dbSubscription.toObject();
};
