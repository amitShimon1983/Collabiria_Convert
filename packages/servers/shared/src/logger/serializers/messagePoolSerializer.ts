import { pick } from '../utils';

const messagePoolSerializer = (messagePool: any) => {
  return pick(messagePool, [
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

export default messagePoolSerializer;
