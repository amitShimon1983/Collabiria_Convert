import { Logger } from '@azure/functions';
import { Document } from 'mongoose';
import { SubscriptionModel, UserModel } from '@harmonie/db';
import { GraphClient } from '@harmonie/graph-client';
import { FunctionsClient } from '@harmonie/common';
import { recursiveWithUsers } from '../../shared';

const { subscriptionInterval, subscriptionCreateFunctionUrl, subscriptionReceiveFunctionUrl } = process.env;

const createFunctionUrl = subscriptionCreateFunctionUrl || 'http://localhost:7071/api/subscription-create';
const receiveFunctionUrl = subscriptionReceiveFunctionUrl || 'http://localhost:7071/api/subscription-receive';
const INTERVAL = +(subscriptionInterval || 86400000) * 2.5;
const OFFSET = +(INTERVAL || 86400000) / 1.5;

class SubscriptionHandler {
  private readonly _subscriptionId: string;
  private readonly _ownerId: string;
  private readonly _mailboxId: string;
  private readonly _logger: Logger;

  constructor(subscriptionId: string, ownerId: string, mailboxId: string, logger: Logger) {
    this._subscriptionId = subscriptionId;
    this._mailboxId = mailboxId;
    this._ownerId = ownerId;
    this._logger = logger;
  }

  private async refreshAndUpdate(token: string, subscription: any) {
    const graphClient = new GraphClient(token);
    const { subscriptionId } = subscription;

    const refreshed = await graphClient.updateSubscription(subscriptionId, {
      expirationDateTime: new Date(new Date().getTime() + INTERVAL),
    });

    if (refreshed) {
      const props = (subscription as Document).toObject();
      await SubscriptionModel.updateOne(
        { subscriptionId },
        {
          ...props,
          expirationDateTime: refreshed.expirationDateTime,
        }
      );
      this._logger.info(
        `[subscription-update] Subscription ${this._subscriptionId} refreshed for owner id ${this._ownerId} mailboxId ${this._mailboxId}`
      );
    }

    return refreshed;
  }

  private async getSubscription(token: string) {
    const graphClient = new GraphClient(token);
    try {
      return await graphClient.getSubscriptionById(this._subscriptionId);
    } catch (error: any) {
      this._logger.warn(
        `[subscription-update] Failed to get subscription ${this._subscriptionId} for owner id ${this._ownerId} mailboxId ${this._mailboxId}, ${error?.message}`
      );
      return null;
    }
  }

  private async tryRefreshSubscription(graphSubscription: any, dbSubscription: any, owners: any[]): Promise<any> {
    const now = new Date().getTime();
    const expirationDate = new Date(new Date(now + OFFSET).toISOString()).getTime();
    const expirationDateTime = new Date(new Date(graphSubscription.expirationDateTime)).getTime();
    if (expirationDateTime <= expirationDate) {
      return await recursiveWithUsers(
        token => this.refreshAndUpdate(token, dbSubscription),
        owners,
        async (e, userId) => {
          dbSubscription.ownerIds.splice(dbSubscription.ownerIds.indexOf(userId), 1);
          await dbSubscription.save();
        }
      );
    }
  }

  private async reCreateSubscription(dbSubscription: any, ownerIds: any[]) {
    const [ownerId] = ownerIds;
    const { mailboxId, resource, subscriptionId } = dbSubscription;

    // support legacy flow where subscription has no mailboxId
    if (!mailboxId) {
      return SubscriptionModel.deleteOne({ subscriptionId });
    }

    const subscription = {
      mailboxId,
      ownerId,
      subscription: {
        changeType: 'created',
        resource,
        notificationUrl: receiveFunctionUrl,
      },
    };
    this._logger.warn(
      `[subscription-update] Subscription ${this._subscriptionId} not found in graph, creating new one. for owner id ${this._ownerId} mailboxId ${this._mailboxId}`
    );

    const { functionAppPublicKey, functionSecret } = process.env;
    const functionClient = new FunctionsClient(functionAppPublicKey, functionSecret);
    return await functionClient.apiPost(createFunctionUrl, subscription);
  }

  public async refreshSubscription(): Promise<any> {
    const subscription = (await SubscriptionModel.findOne({
      subscriptionId: this._subscriptionId,
      isDeleted: false,
    })) as any;

    if (!subscription) {
      throw new Error(
        `Subscription ${this._subscriptionId} not exist in database. for owner id ${this._ownerId} mailboxId ${this._mailboxId}`
      );
    }

    // ownerId is deprecated, will be removed
    const ownerIds = subscription.ownerIds?.length ? subscription.ownerIds : [subscription.ownerId];
    const owners = (await UserModel.find({ userId: ownerIds })) as any[];
    const graphSubscription = await recursiveWithUsers(token => this.getSubscription(token), [owners[0]]);

    if (graphSubscription) {
      return await this.tryRefreshSubscription(graphSubscription, subscription, owners);
    } else {
      return await this.reCreateSubscription(subscription, ownerIds);
    }
  }
}

export default SubscriptionHandler;
