import { Context } from '@azure/functions';
import MessageHandler from './src/handler';
import { init } from '../shared';

(async () => {
  await init();
})();

export default async (context: Context): Promise<void> => {
  const {
    req: { query, body },
  } = context;
  if (query?.validationToken) {
    context.log.info('[subscription-receive] Validating graph api handshake');
    context.res = {
      status: 200,
      body: query.validationToken,
    };
  } else if (body?.value) {
    try {
      const notifications = body.value;
      context.log.info(`[subscription-receive] Received ${notifications.length} notifications`);

      await Promise.all(
        notifications.map(async s => {
          await new MessageHandler(s, context.log).start();
        })
      );
    } catch (e) {
      context.log.error(`[subscription-receive] Failed to handle notification, Error: ${e.message}`);
    }

    context.res = {
      status: 200,
    };
  } else {
    context.res = {
      status: 500,
    };
  }
};
