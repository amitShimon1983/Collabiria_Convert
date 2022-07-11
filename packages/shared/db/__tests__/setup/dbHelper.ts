import { v4 as uuidv4 } from 'uuid';
import {
  UserModel,
  TaskBoardModel,
  GeographyModel,
  StatusModel,
  EmailInfoModel,
  TaskModel,
  MessageRuleModel,
  IMessageRule,
  IMessageRuleDocument,
  MessagePoolModel,
  IMessagePool,
  IMessagePoolDocument,
} from '../../src';

export class createStatusArgs {
  title?: string;
  color?: string;
}

export class createGeographyArgs {
  timezone?: string;
}

export class createUserArgs {
  tenantId?: string;
  userId?: string;
  redirectUri?: string;
  upn?: string;
  domain?: string;
  tokenExpiration?: string;
  emailsShared?: number = 0;
  walkthroughCompleted?: boolean;
  firstUsage?: Date;
  digestSendTime?: Date;
  name?: string;
  settings?: string[];
  teamsUserId?: string;
  geography: string;
}

export class createTaskBoardArgs {
  title?: string;
  channelId?: string;
  mailboxId?: string;
  teamId?: string;
  groupId?: string;
  creator?: string;
  tasks?: string[];
  users: string[];
  isDeleted?: boolean;
  isTest?: boolean;
  channelWebUrl?: string;
  channelRelativeUrl?: string;
  created?: Date;
  lastAccessDate?: Date;
}

export class createEmailInfoArgs {
  emailId: string;
  body?: string;
  subject?: string;
  previewText?: string;
  conversationId: string;
  sentDateTime?: Date;
  attachments?: string[];
  isDraft?: boolean;
}

export class createTaskArgs {
  title?: string;
  description?: string;
  issuer: string;
  emailInfo: string;
  owner: string;
  actions?: string[];
  createdBy: string;
  conversations?: string[];
  tags?: string[];
  taskBoard: string;
  isDeleted?: boolean;
  status: string[];
  priority?: number;
  created?: Date;
  assigneeDate?: Date;
  closeDate?: Date;
}

export const createGeography = async ({ timezone = 'Asia/Jerusalem' }: createGeographyArgs) => {
  return await GeographyModel.create({ timezone });
};

export const createStatus = async ({ title = 'start', color = '#ffffff' }: createStatusArgs) => {
  return await StatusModel.create({ title, color });
};

export const createUser = async (props?: createUserArgs) => {
  const {
    tenantId = '03122737-z0d8-4y00-xe32-5ff087a3db8f',
    userId = 'b8faffb9-6025-4f5c-aa13-8b975d47731e',
    redirectUri = 'https://0d90ad087a22.ngrok.io/task-board/end',
    upn = 'amitg@harmon.ie',
    domain = 'harmonie.sharepoint.com',
    tokenExpiration = '2022-02-20T09:18:58.175Z',
    emailsShared = 0,
    walkthroughCompleted = false,
    firstUsage = new Date('2022-02-16T09:27:56.759Z'),
    digestSendTime = new Date('2022-02-16T09:27:56.759Z'),
    name = 'Amit Ghimon',
    settings = [],
    teamsUserId = '29:1u4L7TiwfsBhxH0yPQGnzPgr9ugOQv8PElrcCjtZz6BaifYOW3COXenCQa1Jvbrbg3FDg0ujDJdyNjrivzKl7PQ',
    geography = '',
  } = props || {};
  return await UserModel.create({
    tenantId,
    userId,
    redirectUri,
    upn,
    domain,
    tokenExpiration,
    emailsShared,
    walkthroughCompleted,
    firstUsage,
    digestSendTime,
    name,
    settings,
    teamsUserId,
    geography,
  });
};

export const createTaskBoard = async ({
  title = 'amittr@harmon.ie',
  channelId = '19:okpqCF9KFykt2H86CwA52xL3D3LpMIx9itai9l35Olk1@thread.tacv2',
  mailboxId = 'amittr@harmon.ie',
  teamId = '064846bd-96cb-4de3-b6b8-254ea0940e37',
  groupId = '064846bd-96cb-4de3-b6b8-254ea0945e38',
  creator = 'b8faffb9-6025-4f5c-aa13-8b975d47731e',
  tasks = [],
  users = [],
  isDeleted = false,
  isTest = true,
  channelWebUrl = 'harmonie.sharepoint.com',
  channelRelativeUrl = '/sites/NewDev/Shared%20Documents/General',
  created = new Date(),
  lastAccessDate = new Date(),
}: createTaskBoardArgs) => {
  return await TaskBoardModel.create({
    title,
    channelId,
    mailboxId,
    teamId,
    groupId,
    creator,
    tasks,
    users,
    isDeleted,
    isTest,
    channelWebUrl,
    channelRelativeUrl,
    created,
    lastAccessDate,
  });
};

export const createEmailInfo = async ({
  emailId,
  body = '<html><head>\n</head><body><div dir="rtl"><div dir="ltr">hi</div></div></body></html>',
  subject = 'Test duplicate Task from same email',
  previewText = 'hi',
  conversationId,
  sentDateTime = new Date('2022-02-27T10:50:11Z'),
  attachments = [],
  isDraft = false,
}: createEmailInfoArgs) => {
  return await EmailInfoModel.create({
    emailId,
    body,
    subject,
    previewText,
    conversationId,
    sentDateTime,
    attachments,
    isDraft,
  });
};

export const createTask = async ({
  issuer,
  emailInfo,
  owner,
  actions,
  createdBy,
  conversations,
  status,
  tags,
  taskBoard,
  assigneeDate,
  closeDate,
  isDeleted = false,
  title = 'Test digest testing 1',
  description = 'hi',
  priority = -0.9588423707179783,
  created = new Date(),
}: createTaskArgs) => {
  return await TaskModel.create({
    issuer,
    emailInfo,
    owner,
    actions,
    createdBy,
    conversations,
    status,
    tags,
    taskBoard,
    assigneeDate,
    closeDate,
    isDeleted,
    title,
    description,
    priority,
    created,
  });
};

export const createMessageRule = async (props: IMessageRule): Promise<IMessageRuleDocument> => {
  return await MessageRuleModel.create(props);
};

export const generateMessage = (taskBoard: any, mailboxId: string, props?: any): IMessagePool => {
  const {
    dismissed = false,
    messageId = uuidv4(),
    createdDateTime = new Date('2022-03-26T11:07:10Z'),
    lastModifiedDateTime = new Date('2022-03-27T06:06:52Z'),
    receivedDateTime = new Date('2022-03-26T11:07:11Z'),
    sentDateTime = new Date('2022-03-26T11:06:56Z'),
    hasAttachments = false,
    internetMessageId = '<CACRL90twr7_JmXDOfRAWXdw+6iANqy1cLDbqcnWRKqs8=s0dAQ@mail.gmail.com>',
    subject = 'Some Subject',
    bodyPreview = '',
    parentFolderId = 'AQMkAGNhMWYxMmQyLWEwMjktNDliNS1hM2FjLThkZAA1MmEyNGVhMjEALgAAA2lgjuPF-MlEvOIAz5oGbfcBAEed0aN9N9tMk2m0s4YexQ4AAAIBCgAAAA==',
    conversationId = 'AAQkAGNhMWYxMmQyLWEwMjktNDliNS1hM2FjLThkZDUyYTI0ZWEyMQAQAPfNWA0RZkBEqtBVENFQnGI=',
    conversationIndex = 'AQHYQQGj981YDRFmQESq0FUQ0VCcYg==',
    isRead = true,
    isDraft = false,
    webLink = 'https://outlook.office365.com/owa/?ItemID=AAMkAGNhMWYxMmQyLWEwMjktNDliNS1hM2FjLThkZDUyYTI0ZWEyMQBGAAAAAABpYI7jxfzJRLziAM%2BaBm33BwBHndGjfTfbTJNptLOGHsUOAAAAAAEKAABHndGjfTfbTJNptLOGHsUOAAKvs%2B0JAAA%3D&exvsurl=1&viewmodel=ReadMessageItem',
    body = {
      contentType: 'html',
      content:
        '<html><head><meta http-equiv="Content-Type" content="text/html; charset=utf-8"></head><body><div dir="ltr"><div class="gmail_default" style="font-family:verdana,sans-serif"><br></div></div></body></html>',
    },
    sender = {
      emailAddress: { name: 'Amit Shimon', address: 'amitg@harmon.ie' },
    },
    from = {
      emailAddress: { name: 'Amit Shimon', address: 'amitg@harmon.ie' },
    },
    toRecipients = [
      {
        emailAddress: { name: 'Yair Oval', address: 'yairov@harmon.ie' },
      },
    ],
    replyTo = [],
    bccRecipients = [],
    ccRecipients = [],
  } = props || {};

  return {
    messageId,
    taskBoard,
    mailboxId,
    dismissed,
    internetMessageId,
    conversationId,
    conversationIndex,
    parentFolderId,
    createdDateTime,
    lastModifiedDateTime,
    receivedDateTime,
    sentDateTime,
    hasAttachments,
    subject,
    from,
    sender,
    replyTo,
    bccRecipients,
    ccRecipients,
    toRecipients,
    body,
    bodyPreview,
    isDraft,
    isRead,
    webLink,
    parentFolder: 'inbox',
  };
};

export const createMessage = async (
  taskBoard: any,
  mailboxId: string,
  props?: IMessagePool
): Promise<IMessagePoolDocument> => {
  const message = generateMessage(taskBoard, mailboxId, props);
  return await MessagePoolModel.create(message);
};
