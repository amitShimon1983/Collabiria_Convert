import mongoose from 'mongoose';
import { prop, index, modelOptions } from '@typegoose/typegoose';
import { ID, ObjectType, Field } from 'type-graphql';
import { License } from './types';

@index({ name: 1 })
@modelOptions({ schemaOptions: { timestamps: true } })
@ObjectType()
export class Organization {
  @Field(() => ID)
  @prop({ type: () => mongoose.Types.ObjectId, auto: true })
  _id?: string;
  @Field(() => String)
  @prop({ type: () => String, required: true })
  name: string;
  @Field(() => String)
  @prop({ type: () => String })
  base64logo?: string;
  @Field(() => License)
  @prop({ type: () => License })
  license?: License;
}
