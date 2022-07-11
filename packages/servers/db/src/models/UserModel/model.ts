import mongoose from 'mongoose';
import { prop, index, modelOptions, Ref } from '@typegoose/typegoose';
import { ID, ObjectType, Field } from 'type-graphql';
import { Geography } from '../GeographyModel';

@index({ email: 1 }, { unique: true })
@modelOptions({ schemaOptions: { timestamps: true } })
@ObjectType()
export class User {
  @Field(() => ID)
  @prop({ type: () => mongoose.Types.ObjectId, auto: true })
  _id?: string;
  @Field(() => String)
  @prop({ type: () => String, required: true })
  userId: string;
  @Field(() => String)
  @prop({ type: () => String, required: true })
  email: string;
  @Field(() => String)
  @prop({ type: () => String, required: true })
  firstName: string;
  @Field(() => String)
  @prop({ type: () => String })
  tenantId: string;
  @Field(() => String)
  @prop({ type: () => String, required: true })
  lastName: string;
  @Field(() => String)
  @prop({ type: () => String, required: true })
  redirectUri: string;
  @Field(() => Date)
  @prop({ type: () => Date })
  lastAccess: Date;
  @Field(() => Date)
  @prop({ type: () => Date })
  tokenExpiration: Date;
  @Field(() => [String])
  @prop({ type: () => [String] })
  uniqueIds: string[];
  @Field(() => String)
  @prop({ type: () => String })
  token: string;
  @Field(() => String)
  @prop({ type: () => String })
  refreshToken: string;
  @Field(() => Geography)
  @prop({ ref: () => Geography })
  geography?: Ref<Geography>;
}
