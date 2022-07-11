import { times } from 'lodash';
import { v4 } from 'uuid';
import { Arg, Query, Mutation, Resolver, Ctx } from 'type-graphql';
import { MessageModel, Message, AttachmentModel, utils } from '@harmonie/server-db';
import { messageService } from '../../../services';
import {
  createMessagesInput,
  GetEmailAttachmentsArgs,
  GetEmailDataArgs,
  GetMailsArgs,
  getMessagesInput,
  InlineAttachment,
  MailFolder,
  MailQuery,
} from './types';

@Resolver()
export default class MessageResolver {
  @Query(() => Message)
  async getMessage(@Arg('args') args: getMessagesInput) {
    const { messageId } = args;
    return MessageModel.findOne({ messageId });
  }

  @Query(() => Message, { nullable: true })
  async getEmailById(@Arg('args') args: GetEmailDataArgs, @Ctx() context: any) {
    const { token, user } = context;
    return await messageService.getEmailDataById(token, args.itemId as string, user.upn);
  }

  @Query(() => [MailFolder])
  async getFolders(@Ctx() context: any) {
    const { token, user } = context;
    const result = await messageService.getFolders({ token, emailAddress: user.upn });
    return result;
  }

  @Query(() => MailQuery)
  async getMails(@Ctx() context: any, @Arg('args') args: GetMailsArgs) {
    const { token, user } = context;
    return await messageService.getMails({ token, user, args });
  }

  @Query(() => [Message])
  async getDismissedMessages() {
    return MessageModel.getDismissed();
  }
  @Query(() => [InlineAttachment])
  async getEmailAttachments(@Arg('args') args: GetEmailAttachmentsArgs, @Ctx() context: any) {
    const { logger, token, user } = context;
    return await messageService.getEmailAttachments({
      itemId: args.id as string,
      token,
      emailAddress: user.upn,
    });
  }
  @Mutation(() => Message)
  async createMessage(@Arg('args') args: createMessagesInput) {
    const { body } = args;
    const result = await utils.runWithTransaction<Message>(async session => {
      const message: Message = {
        messageId: `messageId_${v4()}`,
        teamId: `teamId_${v4()}`,
        internetMessageId: `internetMessageId_${new Date().getTime()}`,
        conversationId: `conversationId_${new Date().getTime()}`,
        conversationIndex: `conversationIndex${new Date().getTime()}`,
        mailboxId: 'yairov@harmon.ie',
        parentFolder: '',
        parentFolderId: '',
        receivedDateTime: new Date(),
        sentDateTime: new Date(),
        createdDateTime: new Date(),
        lastModifiedDateTime: new Date(),
        subject: 'Some Subject',
        body: {
          content: body,
          contentType: 'html',
        },
        from: {
          emailAddress: { name: 'Amit Shimon', address: 'amitg@harmon.ie' },
        },
        sender: {
          emailAddress: { name: 'Amit Shimon', address: 'amitg@harmon.ie' },
        },
        toRecipients: [
          {
            emailAddress: { name: 'Yair Oval', address: 'yairov@harmon.ie' },
          },
        ],
      };

      const [messageInstance] = await MessageModel.create([message], { session });

      const attachments = times(4).map(() => ({
        attachmentId: `attachmentId_${v4()}`,
        name: `name_${v4()}`,
        message: messageInstance,
      }));

      const attachmentInstances = await AttachmentModel.create(attachments, { session });
      messageInstance.attachments = attachmentInstances;
      await messageInstance.save();

      return messageInstance;
    });

    return result;
  }
}
