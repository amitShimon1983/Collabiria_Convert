import { v4 } from 'uuid';
import { Message, Organization, User } from '@harmonie/server-db';
import { organizationService, userService, teamService } from '../../services';

export const createUser = async () => {
  const user: User = {
    userId: `userId${v4()}`,
    firstName: `firstName${v4()}`,
    lastName: `lastName${v4()}`,
    email: `email${v4()}`,
    lastAccess: new Date(),
    token: `token${v4()}`,
    refreshToken: `refreshToken${v4()}`,
    tokenExpiration: new Date(),
    redirectUri: `redirectUri${v4()}`,
    tenantId: `tenantId${v4()}`,
    uniqueIds: [`uniqueIds${v4()}`],
  };
  return await userService.createUser(user);
};

export const createOrganization = async (userObjectId: string) => {
  const organization: Organization = {
    name: `name${v4()}`,
    base64logo: `base64logo_${v4()}`,
    license: {
      name: 'Eli organization',
      type: 'regular',
    },
  };
  return await organizationService.createOrganization(userObjectId, organization);
};

export const createTeam = async (userObjectId: string, organizationObjectId: string) => {
  return await teamService.createTeam(userObjectId, {
    name: `name${v4()}`,
    organization: organizationObjectId,
  });
};

export const generateMessage = (): Message => {
  return {
    dismissed: false,
    messageId: v4(),
    createdDateTime: new Date(),
    lastModifiedDateTime: new Date(),
    receivedDateTime: new Date(),
    sentDateTime: new Date(),
    hasAttachments: false,
    internetMessageId: '<CACRL90twr7_JmXDOfRAWXdw+6iANqy1cLDbqcnWRKqs8=s0dAQ@mail.gmail.com>',
    subject: `message subject ${v4()}`,
    bodyPreview: '',
    parentFolderId:
      'AQMkAGNhMWYxMmQyLWEwMjktNDliNS1hM2FjLThkZAA1MmEyNGVhMjEALgAAA2lgjuPF-MlEvOIAz5oGbfcBAEed0aN9N9tMk2m0s4YexQ4AAAIBCgAAAA==',
    conversationId: v4(),
    conversationIndex: v4(),
    isRead: true,
    isDraft: false,
    webLink:
      'https://outlook.office365.com/owa/?ItemID=AAMkAGNhMWYxMmQyLWEwMjktNDliNS1hM2FjLThkZDUyYTI0ZWEyMQBGAAAAAABpYI7jxfzJRLziAM%2BaBm33BwBHndGjfTfbTJNptLOGHsUOAAAAAAEKAABHndGjfTfbTJNptLOGHsUOAAKvs%2B0JAAA%3D&exvsurl=1&viewmodel=ReadMessageItem',
    body: {
      contentType: 'html',
      content:
        '<html><head><meta http-equiv="Content-Type" content="text/html; charset=utf-8"></head><body><div dir="ltr"><div class="gmail_default" style="font-family:verdana,sans-serif"><br></div></div></body></html>',
    },
    sender: {
      emailAddress: { name: 'Amit Shimon', address: 'amitg@harmon.ie' },
    },
    from: {
      emailAddress: { name: 'Amit Shimon', address: 'amitg@harmon.ie' },
    },
    toRecipients: [
      {
        emailAddress: { name: 'Yair Oval', address: 'yairov@harmon.ie' },
      },
    ],
    replyTo: [],
    bccRecipients: [],
    ccRecipients: [],
    parentFolder: '',
    mailboxId: 'yairov@harmon.ie',
  };
};
