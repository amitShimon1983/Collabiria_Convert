import mongoose from 'mongoose';
import { prop, index, Ref, modelOptions } from '@typegoose/typegoose';
import { ID, ObjectType, Field } from 'type-graphql';
import { Message } from '../MessageModel';

@index({ attachmentId: 1 })
@modelOptions({ schemaOptions: { timestamps: true } })
@ObjectType()
export class Attachment {
  @Field(() => ID)
  @prop({ type: () => mongoose.Types.ObjectId, auto: true })
  _id?: string;
  @Field(() => String)
  @prop({ type: () => String, required: true })
  attachmentId: string;
  @Field(() => String)
  @prop({ type: () => String, required: true })
  name: string;
  @Field(() => String)
  @prop({ type: () => String })
  contentType: string;
  @Field(() => Number)
  @prop({ type: () => Number })
  size: number;
  @Field(() => Boolean)
  @prop({ type: () => Boolean, default: false })
  isInline: boolean;
  @Field(() => String)
  @prop({ type: () => String })
  contentId: string;
  @Field(() => String)
  @prop({ type: () => String })
  uri?: string;
  @Field(() => Message)
  @prop({ ref: () => Message })
  public message: Ref<Message>;
}
