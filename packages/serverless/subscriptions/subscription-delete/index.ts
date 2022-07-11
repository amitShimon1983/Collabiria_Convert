import { Context } from '@azure/functions';
import { GraphClient } from '@harmonie/graph-client';
import { SubscriptionModel, UserModel } from '@harmonie/db';
import { authorize, init, recursiveWithUsers } from '../shared';

(async () => {
  await init();
})();

export default async (context: Context): Promise<void> => {
  try {
    authorize(context.req);
  } catch (e) {
    context.res = {
      status: 401,
      body: e.message,
    };
    return;
  }

  const {
    log,
    req: { body },
  } = context;

  if (body?.subscriptionId && body?.ownerId) {
    const { subscriptionId, ownerId } = body;
    log.info(`[subscription-delete] Deleting subscription ${subscriptionId} for owner ${ownerId}`);

    try {
      const dbSubscription = (await SubscriptionModel.findOne({
        subscriptionId,
        ownerId,
        isDeleted: false,
      })) as any;

      if (!dbSubscription) {
        context.res = {
          status: 404,
          body: 'Subscription not found in database',
        };
        return;
      }

      dbSubscription.isDeleted = true;
      await dbSubscription.save();

      const user = await UserModel.findOne({ userId: ownerId });
      await recursiveWithUsers(
        token => {
          const graphClient = new GraphClient(token);
          return graphClient.deleteSubscription(subscriptionId);
        },
        [user]
      );

      log.info(`[subscription-delete] Subscription ${subscriptionId} for mailbox ${dbSubscription.mailboxId} deleted`);

      context.res = {
        status: 200,
        data: {
          ok: true,
        },
      };
    } catch (e) {
      context.log.error('[subscription-delete] Failed to delete subscription', {
        error: e.message,
        data: body,
      });
      context.res = {
        status: 500,
        body: e.message,
      };
    }
  } else {
    context.res = {
      status: 400,
      body: 'Bad request',
    };
  }
};
