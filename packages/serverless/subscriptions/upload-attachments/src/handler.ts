import { MessagePoolModel, UserModel } from '@harmonie/db';
import { AzureBlobStorage } from '@harmonie/common';
import { GraphClient } from '@harmonie/graph-client';
import { Message } from '@microsoft/microsoft-graph-types';
import { recursiveWithUsers } from '../../shared';

class UploadAttachmentHandler {
  messageId: string;
  subscription: any;
  mailBoxId: string;
  constructor(subscription: any, messageId: string) {
    this.subscription = subscription;
    this.messageId = messageId;
    this.mailBoxId = subscription.mailboxId;
  }
  private async getOwners(subscription: any) {
    // ownerId is deprecated, will be removed
    const ownerIds = subscription.ownerIds?.length ? subscription.ownerIds : [subscription.ownerId];
    return (await UserModel.find({ userId: ownerIds })) as any[];
  }

  private async getMessagePoolById(messageId: string) {
    return await MessagePoolModel.findById(messageId).lean();
  }

  private async handleUpload(subscription: any, messageId: string, mailBoxId: string): Promise<Message | undefined> {
    const owners = await this.getOwners(subscription);
    const message = await recursiveWithUsers(async token => {
      const graphClient = new GraphClient(token);
      const message = (await this.getMessagePoolById(messageId)) as any;
      for (let index = 0; index < message?.attachments?.length; index++) {
        const attachment = message?.attachments[index];
        if (!attachment.isInline) {
          const messageAttachment = await graphClient.getAttachmentContentBytes(
            message.messageId,
            attachment?.attachmentId,
            mailBoxId
          );

          if (!!messageAttachment) {
            const blobName = message._id + '/' + attachment.name;
            const containerName = message.taskBoard.toString();
            await AzureBlobStorage.uploadFile(blobName, containerName, messageAttachment);
          }
        }
      }
      return { ...message };
    }, owners);

    if (!message) {
      throw new Error('Message not found');
    }

    return message;
  }

  public async start() {
    await this.handleUpload(this.subscription, this.messageId, this.mailBoxId);
  }
}

export default UploadAttachmentHandler;
