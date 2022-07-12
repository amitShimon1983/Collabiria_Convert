import mongoose from 'mongoose';
import { prop, index, modelOptions } from '@typegoose/typegoose';
import { ID, ObjectType, Field } from 'type-graphql';

@index({ conversationId: 1 })
@modelOptions({ schemaOptions: { timestamps: true } })
@ObjectType()
export class Comment {
  @Field(() => ID)
  @prop({ type: () => mongoose.Types.ObjectId, auto: true })
  _id?: string;
  @Field(() => String)
  @prop({ type: () => String, required: true })
  content: string;
}
