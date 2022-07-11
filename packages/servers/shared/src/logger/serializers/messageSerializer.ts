import { pick } from '../utils';

const messageSerializer = (message: any) => {
  return pick(message, [
    'id',
    'createdDateTime',
    'lastModifiedDateTime',
    'receivedDateTime',
    'sentDateTime',
    'hasAttachments',
    'internetMessageId',
    'subject',
    'bodyPreview',
    'importance',
    'parentFolderId',
    'conversationId',
    'from',
    'toRecipients',
  ]);
};

export default messageSerializer;
