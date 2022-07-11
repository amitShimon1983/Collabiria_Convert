import mongoose from 'mongoose';
import { prop, index, Ref } from '@typegoose/typegoose';
import { ID, ObjectType, Field } from 'type-graphql';
import { User } from '../UserModel';
import { Team } from '../TeamModel';

@index({ user: 1, team: 1 }, { unique: true })
@ObjectType()
export class TeamMember {
  @Field(() => ID)
  @prop({ type: () => mongoose.Types.ObjectId, auto: true })
  _id?: string;
  @Field(() => User)
  @prop({ ref: () => User })
  public user: Ref<User>;
  @Field(() => Team)
  @prop({ ref: () => Team })
  public team: Ref<Team>;
  @Field(() => String)
  @prop({ type: () => String })
  role: string;
}
