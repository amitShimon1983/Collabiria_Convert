import mongoose from 'mongoose';
import { prop, index, Ref } from '@typegoose/typegoose';
import { ID, ObjectType, Field } from 'type-graphql';
import { User } from '../UserModel';
import { Organization } from '../OrganizationModel';

@index({ user: 1, organization: 1 }, { unique: true })
@ObjectType()
export class OrganizationMember {
  @Field(() => ID)
  @prop({ type: () => mongoose.Types.ObjectId, auto: true })
  _id?: string;
  @Field(() => User)
  @prop({ ref: () => User })
  public user: Ref<User>;
  @Field(() => Organization)
  @prop({ ref: () => Organization })
  public organization: Ref<Organization>;
  @Field(() => String)
  @prop({ type: () => String })
  role: string;
}
