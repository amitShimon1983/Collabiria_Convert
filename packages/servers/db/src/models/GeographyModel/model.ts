import mongoose from 'mongoose';
import { prop } from '@typegoose/typegoose';
import { ID, ObjectType, Field } from 'type-graphql';

@ObjectType()
export class Geography {
  @Field(() => ID)
  @prop({ type: () => mongoose.Types.ObjectId, auto: true })
  _id?: string;
  @Field(() => String)
  @prop({ type: () => String, required: true })
  timezone: string;
}
