import { Logger } from '@azure/functions';
import { Message, ChangeNotification, FileAttachment } from '@microsoft/microsoft-graph-types';
import { SubscriptionModel, EmailInfoModel, UserModel, MessageRuleModel, MessagePoolModel } from '@harmonie/db';
import { jsonQuery, AzureBlobStorage, processEmailBody, promises } from '@harmonie/common';
import { GraphClient, restClient, dismissEmail, saveInlineAttachments } from '@harmonie/graph-client';
import { recursiveWithUsers } from '../../shared';

const { saveNotificationPath, serverUrl } = process.env;

if (!saveNotificationPath) {
  console.error(new Error('saveNotificationPath is not configured, check function app configuration.'));
}

if (!serverUrl) {
  console.error(new Error('serverUrl is not configured, check function app configuration.'));
}

const serverEndpoint = serverUrl + saveNotificationPath;
const EXTENDED_SENT_MAIL_ID = 'String {ddfc984d-b826-40d7-b48b-57002df800e6} Name SentEmail';

class MessageHandler {
  private readonly _notification: ChangeNotification;
  private readonly _resourceId: string;
  private _token: string;
  private _graphClient: GraphClient;
  private readonly _logger: Logger;

  constructor(notification: ChangeNotification, logger: Logger) {
    this._notification = notification;
    this._logger = logger;
    this._logger.info(`[subscription-receive] Received notification: ${JSON.stringify(this._notification)}`);
    this._resourceId = (this._notification.resourceData as any)?.id;
  }

  private async handleMessageReceived(subscription: any): Promise<any | undefined> {
    const owners = await this.getOwners(subscription);
    const { message, parentFolder, downloadedAttachments } = await recursiveWithUsers(async token => {
      this._token = token;
      this._graphClient = new GraphClient(this._token);
      const graphMessage = await this._graphClient.getMailMessage(subscription.mailboxId, this._resourceId);
      const parentFolder = await this.getMessageParentFolder(this._graphClient, subscription, graphMessage);
      const attachments = await this.downloadAttachments(graphMessage, this._graphClient, subscription);
      return { message: graphMessage, parentFolder, downloadedAttachments: attachments };
    }, owners);
    if (!message) {
      throw new Error('Message not found');
    }

    return { message, parentFolder, downloadedAttachments };
  }
  private async dismissMessage(subscription: any, message: Message, boardIds: string[], retryNum = 0): Promise<any> {
    try {
      this._logger.info(
        `[subscription-receive] start dismiss mail for task boards ${boardIds?.join(', ')} for mailbox ${
          subscription.mailboxId
        } message id ${message.id}`
      );
      return await dismissEmail({ from: subscription.mailboxId, id: message.id, boardIds, client: this._graphClient });
    } catch (error: any) {
      if (retryNum < 3) {
        retryNum++;
        await promises.sleep(3000);
        await this.dismissMessage(subscription, message, boardIds, retryNum);
      }
      this._logger.error(
        `[subscription-receive] error dismiss mail for task boards ${boardIds?.join(' , ')} for mailbox ${
          subscription.mailboxId
        } message id ${message.id} error : ${error?.message}`
      );
    }
  }

  private async uploadAttachments(messagePool: any, downloadedAttachments: FileAttachment[]) {
    for (let index = 0; index < downloadedAttachments?.length; index++) {
      const attachment = downloadedAttachments[index] as any;
      if (!attachment.isInline) {
        const blobName = `${messagePool._id}/${attachment.name}`;
        const containerName = messagePool.taskBoard?.toString();
        try {
          await AzureBlobStorage.uploadFile(blobName, containerName, attachment.contentByte);
        } catch (error: any) {
          throw new Error(
            `[subscription-receive] failed to upload attachments to blob for message id ${messagePool.messageId}, blobName ${blobName}, containerName ${containerName}`
          );
        }
      }
    }
  }

  private async downloadAttachments(message: Message, graphClient: GraphClient, subscription: any) {
    const attachments = [];
    for (let index = 0; index < message?.attachments?.length; index++) {
      const attachment = message?.attachments[index];
      try {
        const messageAttachment = await graphClient.getAttachmentContentBytes(
          message.id,
          attachment?.id,
          subscription.mailboxId
        );
        attachments.push({ ...attachment, contentByte: messageAttachment });
      } catch (error: any) {
        console.log({ message: error.message });
      }
    }
    return attachments;
  }

  private async getDbSubscription() {
    const { subscriptionId } = this._notification;
    const subscription = await SubscriptionModel.findOne({
      subscriptionId,
      isDeleted: false,
    });

    if (!subscription) {
      // todo: call delete subscription ?
      throw new Error(`Subscription with id ${subscriptionId} was not found in db`);
    }

    return subscription;
  }

  private async checkEmailNotExist() {
    const email = await EmailInfoModel.findOne({ emailId: this._resourceId });
    if (email) {
      throw new Error(`Email with id ${this._resourceId} already exist in database`);
    }
  }

  private async isConversationExist(conversationId: string) {
    return (await EmailInfoModel.findOne({ conversationId })) !== null;
  }

  private async getOwners(subscription: any) {
    // ownerId is deprecated, will be removed
    const ownerIds = subscription.ownerIds?.length ? subscription.ownerIds : [subscription.ownerId];
    return (await UserModel.find({ userId: ownerIds })) as any[];
  }

  private async updateMessageFromSubscription(message: Message, subscription: any) {
    const { conversationId, id } = message;
    this._logger.info(`[subscription-receive] Found message ${id}`);
    if (!(await this.isConversationExist(conversationId))) {
      this._logger.warn(
        `[subscription-receive] Message for mailbox ${subscription.mailboxId} not related to any task, id: ${this._resourceId}`
      );
      return;
    }
    try {
      await this.checkEmailNotExist();
    } catch (error: any) {
      this._logger.info(`[subscription-receive] Message for mailbox ${subscription.mailboxId} OK, id: ${id}.`);
      throw error;
    }

    try {
      const result = await restClient.postFetch(serverEndpoint, {
        message,
        subscription,
      });
      this._logger.info(`[subscription-receive] Message for mailbox ${subscription.mailboxId} OK, id: ${id}.`);
      return result;
    } catch (e) {
      throw new Error(`Fail to send message ${this._resourceId} to server, Error: ${e.message}`);
    }
  }

  private async updatePoolFromSubscription(
    message: Message,
    subscription: any,
    emailInfos = [],
    parentFolder: string,
    downloadedAttachments: FileAttachment[]
  ) {
    const { mailboxId } = subscription;
    const { id: messageId } = message;
    const groups = await MessageRuleModel.groupRulesByTaskBoard(mailboxId.toLowerCase());

    this._logger.info(
      `[subscription-receive] Found ${groups.length} rule groups for mailboxId ${subscription.mailboxId}`
    );

    const taskBoards = groups.filter(({ _id, rules }: any) =>
      rules.some(({ predicate: { type, input } }: any) => {
        try {
          return jsonQuery.evaluate(type, input, [message]);
        } catch (e) {
          this._logger.error(
            `[subscription-receive] Error validating rules, type ${type}, input ${input}, from: ${message.from.emailAddress.address}`
          );
          return false;
        }
      })
    );

    if (!taskBoards.length) {
      this._logger.info(`[subscription-receive] No results found for predicates, mailboxId ${subscription.mailboxId}`);
      return;
    }

    const existing = (
      await MessagePoolModel.find({
        $or: taskBoards.map(({ _id }: any) => ({ taskBoard: _id.toString(), mailboxId, messageId })),
      }).select('taskBoard')
    ).map(({ taskBoard }) => taskBoard?.toString());
    //filter task boards that already create emailInfo for that message
    const filteredTaskBoards = taskBoards.filter(
      ({ _id }: any) =>
        !existing.includes(_id.toString()) &&
        !emailInfos.some(
          ({ emailId, task: { taskBoard } }) =>
            emailId === messageId && taskBoard && taskBoard?._id?.toString() === _id.toString()
        )
    );
    const messages: any[] = [];
    for (let index = 0; index < filteredTaskBoards?.length; index++) {
      const { _id } = filteredTaskBoards[index];
      messages.push({
        ...MessagePoolModel.fromGraphMessage(message),
        attachments: [],
        taskBoard: _id,
        mailboxId,
        parentFolder,
        dismissed: emailInfos.length
          ? emailInfos.some(
              ({ emailId, task: { taskBoard } }) =>
                emailId === messageId && taskBoard?._id?.toString() === _id.toString()
            )
          : false,
      });
    }
    if (messages.length) {
      const results = await MessagePoolModel.create(messages);
      const taskBoardIds = await this.handleMessagesPostCreate(
        results as any,
        downloadedAttachments,
        subscription,
        message,
        messageId
      );

      await this.dismissMessage(subscription, message, taskBoardIds);

      this._logger.info(
        `[subscription-receive] Inserted ${messages.length} messages to pool for mailbox ${subscription.mailboxId}`
      );

      return results;
    }

    return null;
  }

  private async handleMessagePoolPostCreate(
    messagePool: any,
    downloadedAttachments: FileAttachment[],
    subscription: any,
    message: Message,
    messageId: string
  ) {
    try {
      await this.uploadAttachments(messagePool, downloadedAttachments);
      const inlineAttachments = await saveInlineAttachments(
        message.conversationId,
        downloadedAttachments.filter(attachment => attachment.isInline),
        messagePool.taskBoard
      );
      messagePool.body.content = processEmailBody(messagePool?.body?.content, inlineAttachments);

      const attachments = downloadedAttachments?.map(({ id, ...attachmentProps }: any) => {
        const inline = inlineAttachments.find((a: any) => a.id === id);
        const otherProps = inline ? inline : attachmentProps;
        return {
          ...otherProps,
          attachmentId: id,
        };
      });
      messagePool.attachments = attachments;
      await messagePool.save();
      this._logger.info(
        `[subscription-receive] Insert message ${messagePool._id} to pool for mailbox ${
          subscription.mailboxId
        } for taskboardId ${messagePool?.taskBoard?.toString()}`
      );
      console.log(
        `[subscription-receive] Insert message ${messagePool._id} to pool for mailbox ${
          subscription.mailboxId
        } for taskboardId ${messagePool?.taskBoard?.toString()}`
      );
    } catch (error: any) {
      this._logger.error(
        ` ${error?.message}, message id ${messageId} for mailboxId ${
          subscription.mailboxId
        } taskboard id ${messagePool?.taskBoard?.toString()}`
      );
      await messagePool.remove();
    }
  }

  public async start() {
    if (!this._resourceId) {
      return;
    }

    const subscription = (await this.getDbSubscription()) as any;
    this._logger.info(
      `[subscription-receive] Found db subscription ${subscription.subscriptionId} for mailboxId ${subscription.mailboxId}`
    );

    const { message, parentFolder, downloadedAttachments } = await this.handleMessageReceived(subscription);
    if (message.isDraft) {
      return;
    }

    const { singleValueExtendedProperties } = message as any;

    // prevent reply from being inserted twice since we send the reply as cc to the sender
    const emailSendId = singleValueExtendedProperties?.find(({ id }: any) => id === EXTENDED_SENT_MAIL_ID)?.value;
    const sentEmail = emailSendId ? await EmailInfoModel.findOne({ _id: emailSendId }) : null;

    if (sentEmail) {
      this._logger.warn(
        `[subscription-receive] Message is an internal reply: ${emailSendId} for mailboxId ${subscription.mailboxId}`
      );
      return;
    }

    let emailInfos;

    try {
      emailInfos = await this.updateMessageFromSubscription(message, subscription);
    } catch (e) {
      this._logger.error(`[subscription-receive] Failed to update message from subscription, Error: ${e.message}`);
    }

    try {
      await this.updatePoolFromSubscription(message, subscription, emailInfos, parentFolder, downloadedAttachments);
    } catch (e) {
      this._logger.error(`[subscription-receive] Failed to add message to pool, Error: ${e.message}`);
    }
  }

  private async getMessageParentFolder(graphClient: GraphClient, subscription: any, graphMessage: Message) {
    let parentFolder = '';
    const messageFolders = await graphClient.getFolders(subscription.mailboxId);
    if (messageFolders?.value?.length) {
      const folder = messageFolders.value.find(folder => folder.id === graphMessage.parentFolderId);
      parentFolder = folder?.wellKnownName;
    }
    return parentFolder;
  }
  private async handleMessagesPostCreate(
    results: any[],
    downloadedAttachments: FileAttachment[],
    subscription: any,
    message: Message,
    messageId: string
  ) {
    const taskBoardsIds = [];
    for (let poolMessagesIndex = 0; poolMessagesIndex < results.length; poolMessagesIndex++) {
      const messagePool = results[poolMessagesIndex];
      await this.handleMessagePoolPostCreate(messagePool, downloadedAttachments, subscription, message, messageId);
      if (message.parentFolderId !== 'sentitems') {
        //if the message is not from the subscription sent items we will dismiss it on graph
        const taskBoardId = messagePool.taskBoard.toString();
        taskBoardsIds.push(taskBoardId);
      }
    }
    return taskBoardsIds;
  }
}

export default MessageHandler;
