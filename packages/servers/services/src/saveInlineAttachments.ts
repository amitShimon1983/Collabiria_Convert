import { MessagePoolModel, saveFilesToDb } from '@harmonie/server-db';
import { flatten } from 'lodash';

const { serverUrl } = process.env;

const getAllDbInlineAttachments = async (conversationId: string, taskBoard: string): Promise<any[]> => {
  const messages = await MessagePoolModel.find({ conversationId, taskBoard });
  if (!messages || !messages.length) {
    return [];
  }

  const results = flatten(messages.map((message: any) => message?.attachments))
    .filter((attachment: any) => attachment?.contentId && attachment.isInline)
    .map((attachment: any) => attachment.toObject());
  return results;
};

const filterExistingAttachments = (messageAttachments: any[], dbAttachments: any[]): any[] => {
  if (!messageAttachments || !messageAttachments.length) {
    return [];
  }
  return messageAttachments.filter(
    (messageAttachment: any) =>
      !dbAttachments.some(
        (dbAttachment: any) =>
          dbAttachment.attachmentId === messageAttachment.id || dbAttachment.contentId === messageAttachment.contentId
      )
  );
};

export const saveInlineAttachments = async (
  conversationId: any,
  messageInlineAttachments: any[],
  taskBoardId: string
): Promise<any[]> => {
  const dDbInlineAttachments = await getAllDbInlineAttachments(conversationId, taskBoardId);
  const inlineAttachmentsToCreate = filterExistingAttachments(messageInlineAttachments, dDbInlineAttachments);
  if (!inlineAttachmentsToCreate.length) {
    return dDbInlineAttachments || [];
  }
  const promises = inlineAttachmentsToCreate.map(async (inlineAttachment: any) => {
    const { id, name } = inlineAttachment;
    const buffer = inlineAttachment.contentByte;
    const result = (await saveFilesToDb({
      buffer,
      fileName: name,
    })) as any;
    return {
      ...inlineAttachment,
      uri: `${serverUrl}/api/files/${result.id.toString()}/${taskBoardId}`,
    };
  });
  const uploadedInlineAttachments = await Promise.all(promises.flat());
  return [...uploadedInlineAttachments, ...(dDbInlineAttachments || [])];
};
