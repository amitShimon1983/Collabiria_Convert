import { Context } from '@azure/functions';
import SubscriptionHandler from './src/handler';
import { authorize, init } from '../shared';

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

  if (body?.subscriptionId) {
    const { subscriptionId, ownerId, mailboxId } = body;
    context.log.info(
      `[subscription-update] Updating subscription ${subscriptionId} for owner id ${ownerId} mailboxId ${mailboxId} `
    );

    try {
      const service = new SubscriptionHandler(body.subscriptionId, ownerId, mailboxId, log);
      const updated = await service.refreshSubscription();
      log.info(
        `[subscription-update] Subscription ${subscriptionId} updated for owner id ${ownerId} mailboxId ${mailboxId}`
      );

      context.res = {
        status: 200,
        body: updated || {},
      };
    } catch (e) {
      context.log.error(
        `[subscription-update] Failed to update subscription for owner id ${ownerId} mailboxId ${mailboxId}`,
        { error: e.message, data: body }
      );
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
