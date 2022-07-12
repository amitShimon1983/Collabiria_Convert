import { Arg, Query, Resolver, Ctx, Mutation } from 'type-graphql';
import { MessageModel, Message } from '@harmonie/server-db';
import { graphMessageService, messageService } from '../../../services';
import {
  createMessagesInput,
  GetEmailAttachmentsArgs,
  GetEmailDataArgs,
  GetMailsArgs,
  getMessagesInput,
  getTeamRootMessagesInput,
  getTeamRootMessagesOutput,
  InlineAttachment,
  MailFolder,
  MailQuery,
} from './types';

@Resolver()
export default class MessageResolver {
  @Query(() => Message)
  async getMessage(@Arg('args') args: getMessagesInput) {
    const { messageObjectId } = args;
    return messageService.getMessage(messageObjectId);
  }

  @Query(() => Message, { nullable: true })
  async getEmailById(@Arg('args') args: GetEmailDataArgs, @Ctx() context: any) {
    const { token, user } = context;
    return await graphMessageService.getEmailDataById(token, args.itemId as string, user.upn);
  }

  @Query(() => [MailFolder])
  async getFolders(@Ctx() context: any) {
    const { token, user } = context;
    const result = await graphMessageService.getFolders({ token, emailAddress: user.upn });
    return result;
  }

  @Query(() => MailQuery)
  async getMails(@Ctx() context: any, @Arg('args') args: GetMailsArgs) {
    const { token, user } = context;
    return await graphMessageService.getMails({ token, user, args });
  }

  @Query(() => [Message])
  async getDismissedMessages() {
    return MessageModel.getDismissed();
  }

  @Query(() => [InlineAttachment])
  async getEmailAttachments(@Arg('args') args: GetEmailAttachmentsArgs, @Ctx() context: any) {
    const { token, user } = context;
    return await graphMessageService.getEmailAttachments({
      itemId: args.id as string,
      token,
      emailAddress: user.upn,
    });
  }

  @Mutation(() => Message)
  async createMessage(@Arg('args') args: createMessagesInput, @Ctx() context: any) {
    const { token, user } = context;
    const { body, messageId, teamId } = args;
    const message = await graphMessageService.getEmailDataById(token, messageId, user.upn);

    if (!message) {
      throw new Error('message does not exist');
    }

    return await messageService.createMessage(teamId, {
      ...message,
      body: {
        ...message.body,
        content: body,
      },
    });
  }

  @Query(() => getTeamRootMessagesOutput)
  async getTeamRootMessages(@Arg('args') args: getTeamRootMessagesInput) {
    const { teamObjectId, searchText, filters, skip, limit } = args;
    return messageService.getTeamRootMessages(teamObjectId, searchText, filters, skip, limit);
  }
}
