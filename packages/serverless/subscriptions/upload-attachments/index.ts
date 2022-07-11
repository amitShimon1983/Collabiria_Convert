import { Context } from '@azure/functions';
import { authorize, init } from '../shared';
import UploadAttachmentHandler from './src/handler';

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
  if (body?.subscription) {
    const { messageId, subscription } = body;

    try {
      log.info(`[upload-attachments] messageId ${messageId}`);
      new UploadAttachmentHandler(subscription, messageId).start();
      context.res = {
        status: 200,
        body: {} || {},
      };
    } catch (e) {
      context.log.error('[upload-attachments] Failed to upload attachments', { error: e.message, data: body });
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
