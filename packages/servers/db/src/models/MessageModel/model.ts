import mongoose from 'mongoose';
import { prop, Ref, index, ReturnModelType, modelOptions } from '@typegoose/typegoose';
import { ID, ObjectType, Field } from 'type-graphql';
import { Importance, Body, Recipient } from './types';
import { Attachment } from '../AttachmentModel';
import { htmlSanitize, putGlobalCssToInlineStyles } from '@harmonie/server-shared';
import { JSDOM } from 'jsdom';
@index({ teamId: 1, mailboxId: 1, messageId: 1 }, { unique: true })
@index({ from: 1 })
@index({ toRecipients: 1 })
@index({ subject: 1 })
@index({ '$**': 'text', _type: 1 }, { default_language: 'none' })
@modelOptions({ schemaOptions: { timestamps: true } })
@ObjectType()
export class Message {
  @Field(() => ID)
  @prop({ type: () => mongoose.Types.ObjectId, auto: true })
  _id?: string;
  @Field(() => String)
  @prop({ type: () => String, required: true })
  teamId: string;
  @Field(() => String)
  @prop({ type: () => String, required: true })
  messageId: string;
  @Field(() => String)
  @prop({ type: () => String, required: true })
  mailboxId: string;
  @Field(() => Boolean)
  @prop({ type: () => Boolean, default: false })
  dismissed?: boolean;
  @Field(() => String)
  @prop({ type: () => String, required: true })
  internetMessageId: string;
  @Field(() => String)
  @prop({ type: () => String, required: true })
  conversationId: string;
  @Field(() => String)
  @prop({ type: () => String })
  conversationIndex: string;
  @Field(() => String)
  @prop({ type: () => String })
  parentFolderId: string;
  @Field(() => String)
  @prop({ type: () => String })
  parentFolder: string;
  @Field(() => Date)
  @prop({ type: () => Date })
  createdDateTime?: Date;
  @Field(() => Date)
  @prop({ type: () => Date })
  lastModifiedDateTime?: Date;
  @Field(() => Date)
  @prop({ type: () => Date })
  receivedDateTime: Date;
  @Field(() => Date)
  @prop({ type: () => Date })
  sentDateTime: Date;
  @Field(() => Boolean)
  @prop({ type: () => Boolean, default: false })
  hasAttachments?: boolean;
  @Field(() => String)
  @prop({ type: () => String, required: true })
  subject: string;
  @Field(() => Recipient)
  @prop({ type: () => Recipient })
  from: Recipient;
  @Field(() => Recipient)
  @prop({ type: () => Recipient })
  sender: Recipient;
  @Field(() => [Recipient])
  @prop({ type: () => [Recipient] })
  toRecipients: Recipient[];
  @Field(() => Body)
  @prop({ type: () => Body })
  body: Body;
  @Field(() => String)
  @prop({ type: () => String })
  bodyPreview?: string;
  @Field(() => Importance)
  @prop({ required: true, enum: Importance, default: Importance.low })
  importance?: Importance;
  @Field(() => Boolean)
  @prop({ type: () => Boolean, default: false })
  isDraft?: boolean;
  @Field(() => Boolean)
  @prop({ type: () => Boolean, default: false })
  @Field(() => Boolean)
  isRead?: boolean;
  @Field(() => String)
  @prop({ type: () => String })
  webLink?: string;
  @Field(() => [Attachment])
  @prop({ ref: () => Attachment })
  attachments?: Ref<Attachment>[];
  @Field(() => [Recipient])
  @prop({ type: () => [Recipient] })
  replyTo?: Recipient[];
  @Field(() => [Recipient])
  @prop({ type: () => [Recipient] })
  bccRecipients?: Recipient[];
  @Field(() => [Recipient])
  @prop({ type: () => [Recipient] })
  ccRecipients?: Recipient[];

  public static async getDismissed(this: ReturnModelType<typeof Message>) {
    return this.find({ dismissed: false }).lean();
  }

  public static fromGraphMessage(graphMessage: any, sanitizedBody: boolean = true): Message {
    const { id, createdDateTime, lastModifiedDateTime, receivedDateTime, sentDateTime, attachments, ...rest } =
      graphMessage;
    const updatedBodyHtml = this.sanitizeBody(graphMessage, sanitizedBody);
    return {
      ...rest,
      body: {
        ...graphMessage.body,
        content: htmlSanitize(updatedBodyHtml),
      },
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
  }
  public static sanitizeBody(graphMessage: any, sanitizedBody: boolean) {
    let updatedBodyHtml = graphMessage.body.content;
    if (sanitizedBody) {
      const domTree = new JSDOM(graphMessage.body.content);
      const domDocument = domTree.window.document;
      putGlobalCssToInlineStyles(domDocument as any);
      updatedBodyHtml = domTree.serialize();
    }
    return updatedBodyHtml;
  }
}
