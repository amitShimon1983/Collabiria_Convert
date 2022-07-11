import mongoose from 'mongoose';
import { prop, index, modelOptions, Ref } from '@typegoose/typegoose';
import { ID, ObjectType, Field } from 'type-graphql';
import { Organization } from '../OrganizationModel';

@index({ name: 1 })
@modelOptions({ schemaOptions: { timestamps: true } })
@ObjectType()
export class Team {
  @Field(() => ID)
  @prop({ type: () => mongoose.Types.ObjectId, auto: true })
  _id?: string;
  @Field(() => String)
  @prop({ type: () => String, required: true })
  name: string;
  @Field(() => Organization)
  @prop({ ref: () => Organization })
  public organization: Ref<Organization>;
}
