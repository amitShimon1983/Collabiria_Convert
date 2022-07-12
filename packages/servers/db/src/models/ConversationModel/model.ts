import mongoose from 'mongoose';
import { prop, index, Ref } from '@typegoose/typegoose';
import { ID, ObjectType, Field } from 'type-graphql';
import { Team } from '../TeamModel';
import { Message } from '../MessageModel';

@index({ conversationId: 1, team: 1 })
@ObjectType()
export class Conversation {
  @Field(() => ID)
  @prop({ type: () => mongoose.Types.ObjectId, auto: true })
  _id?: string;
  @Field(() => String)
  @prop({ type: () => String, required: true })
  conversationId: string;
  @Field(() => Team)
  @prop({ ref: () => Team })
  public team: Ref<Team>;
  @Field(() => Message)
  @prop({ ref: () => Message, required: true })
  public rootMessage: Ref<Message>;
}
