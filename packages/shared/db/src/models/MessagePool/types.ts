import { Model, Document, Query } from 'mongoose';

export interface PageInfo {
  endCursor?: string;
  hasNextPage: boolean;
}

export interface SearchResult {
  pageInfo: PageInfo;
  results: IMessagePoolDocument[];
}

export enum Importance {
  low = 'low',
  normal = 'normal',
  high = 'high',
}

export interface IEmailAddress {
  name?: string;
  address?: string;
}

export interface IRecipient {
  emailAddress: IEmailAddress;
}

export interface IBody {
  content: string;
  contentType: string;
}

export interface IAttachment {
  attachmentId: string;
  name: string;
  contentType: string;
  size: number;
  isInline: boolean;
  contentId: string;
  uri?: string;
}

export interface IMessagePool {
  messageId: string;
  taskBoard: any;
  mailboxId: string;
  dismissed: boolean;
  internetMessageId: string;
  conversationId: string;
  conversationIndex: string;
  parentFolderId: string;
  parentFolder: string;
  createdDateTime?: Date;
  lastModifiedDateTime?: Date;
  receivedDateTime: Date;
  sentDateTime: Date;
  hasAttachments: boolean;
  subject: string;
  from: IRecipient;
  sender: IRecipient;
  replyTo: IRecipient[];
  bccRecipients: IRecipient[];
  ccRecipients: IRecipient[];
  toRecipients: IRecipient[];
  body: IBody;
  bodyPreview: string;
  importance?: Importance;
  isDraft: boolean;
  isRead: boolean;
  webLink: string;
  attachments?: IAttachment[];
}

export interface IMessagePoolDocument extends IMessagePool, Document {
  toGraphMessage: () => any;
}

export interface IMessagePoolModel extends Model<IMessagePoolDocument> {
  search: (
    taskBoard: string,
    searchTerms?: Record<string, any>,
    weeksBefore?: number,
    endCursor?: string,
    parentFolder?: string
  ) => Promise<SearchResult>;

  dismissMessage: (
    taskBoard: string,
    messageId: string
  ) => Promise<Query<IMessagePoolDocument | null, IMessagePoolDocument>>;

  unDismissMessage: (
    taskBoard: string,
    messageId: string
  ) => Promise<Query<IMessagePoolDocument | null, IMessagePoolDocument>>;

  fromGraphMessage: (graphMessage: any) => IMessagePool;
}
