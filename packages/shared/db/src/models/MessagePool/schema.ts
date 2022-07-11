import { model, Schema, Query } from 'mongoose';
import { IMessagePoolModel, IMessagePoolDocument, Importance, IMessagePool } from './types';
import { search, ParentFolder } from './search';

const emailAddress = { name: String, address: String };
const recipient = { emailAddress: { type: emailAddress } };
const body = { content: String, contentType: String };
const attachment = {
  attachmentId: String,
  name: String,
  contentType: String,
  size: Number,
  isInline: Boolean,
  contentId: String,
  uri: String,
};

const schema: Schema<IMessagePoolDocument, IMessagePoolModel> = new Schema({
  messageId: { type: String, required: true },
  taskBoard: { type: Schema.Types.ObjectId, ref: 'TaskBoard', required: true },
  mailboxId: { type: String, required: true },
  dismissed: { type: Boolean, default: false },
  parentFolder: String,
  internetMessageId: String,
  conversationId: String,
  conversationIndex: String,
  parentFolderId: String,
  createdDateTime: Date,
  lastModifiedDateTime: Date,
  receivedDateTime: Date,
  sentDateTime: Date,
  hasAttachments: Boolean,
  subject: { type: String, default: '(no subject)' },
  from: recipient,
  sender: recipient,
  replyTo: [recipient],
  bccRecipients: [recipient],
  ccRecipients: [recipient],
  toRecipients: [recipient],
  body,
  bodyPreview: String,
  importance: {
    type: String,
    enum: Object.values(Importance),
  },
  isDraft: { type: Boolean, default: false },
  isRead: { type: Boolean, default: false },
  webLink: String,
  attachments: [attachment],
});

schema.index({ taskBoard: 1, mailboxId: 1, messageId: 1 }, { unique: true });
schema.index({ from: 1 });
schema.index({ toRecipients: 1 });
schema.index({ subject: 1 });
schema.index({ '$**': 'text', _type: 1 }, { default_language: 'none' });

schema.statics.search = async function (
  taskBoard: string,
  searchTerms: any = {},
  weeksBefore?: number,
  endCursor?: string,
  parentFolder: string = ParentFolder.Inbox
) {
  return search.apply(this, [taskBoard, searchTerms, weeksBefore, endCursor, parentFolder]);
};

schema.statics.dismissMessage = async function (
  taskBoard: string,
  messageId: string
): Promise<Query<IMessagePoolDocument | null, IMessagePoolDocument>> {
  return this.findOneAndUpdate({ taskBoard, messageId }, { $set: { dismissed: true } });
};

schema.statics.unDismissMessage = async function (
  taskBoard: string,
  messageId: string
): Promise<Query<IMessagePoolDocument | null, IMessagePoolDocument>> {
  return this.findOneAndUpdate({ taskBoard, messageId }, { $set: { dismissed: false } });
};

schema.statics.fromGraphMessage = function (graphMessage: any): IMessagePool {
  const { id, createdDateTime, lastModifiedDateTime, receivedDateTime, sentDateTime, attachments, ...rest } =
    graphMessage;
  return {
    ...rest,
    createdDateTime: createdDateTime ? new Date(createdDateTime) : null,
    lastModifiedDateTime: lastModifiedDateTime ? new Date(lastModifiedDateTime) : null,
    receivedDateTime: new Date(receivedDateTime),
    sentDateTime: new Date(sentDateTime),
    messageId: id,
    attachments: attachments?.map(({ id, ...attachmentProps }: any) => ({
      ...attachmentProps,
      attachmentId: id,
    })),
  };
};

schema.methods.toGraphMessage = function (): any {
  const { messageId, createdDateTime, lastModifiedDateTime, receivedDateTime, sentDateTime, attachments, ...rest } =
    this.toObject();
  return {
    ...rest,
    createdDateTime: createdDateTime ? createdDateTime.toISOString() : '',
    lastModifiedDateTime: lastModifiedDateTime ? lastModifiedDateTime.toISOString() : '',
    receivedDateTime: receivedDateTime.toISOString(),
    sentDateTime: sentDateTime.toISOString(),
    id: messageId,
    attachments: attachments?.map(({ attachmentId, ...attachmentProps }: any) => ({
      ...attachmentProps,
      id: attachmentId,
    })),
  };
};

export default model<IMessagePoolDocument, IMessagePoolModel>('MessagePool', schema);
