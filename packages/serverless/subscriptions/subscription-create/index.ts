import { Context } from '@azure/functions';
import { create } from './src/handler';
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
      body: {
        error: e.message,
      },
    };
    return;
  }

  const {
    log,
    req: { body },
  } = context;

  if (!body) {
    context.res = {
      status: 400,
      body: {
        error: 'Bad request',
      },
    };
    return;
  }

  const { mailboxId, ownerId, subscription } = body;

  if (!mailboxId || !ownerId || !subscription) {
    context.res = {
      status: 400,
      body: {
        error: 'Bad request',
      },
    };
    return;
  }

  log.info(`[subscription-create] Creating subscription for mailbox ${mailboxId}`);

  try {
    const dbSubscription = await create(mailboxId, ownerId, subscription, log);

    context.res = {
      status: 200,
      body: dbSubscription,
    };
  } catch (e) {
    log.error('[subscription-create] Failed to create subscription', {
      error: e.message,
      data: body,
    });
    context.res = {
      status: 500,
      body: {
        error: e.message,
      },
    };
  }
};
