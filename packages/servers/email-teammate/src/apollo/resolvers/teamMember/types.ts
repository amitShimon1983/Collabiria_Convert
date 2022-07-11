import { InputType, Field, ObjectType } from 'type-graphql';
import { Team, User } from '@harmonie/server-db';

@InputType()
export class getTeamMembersInput {
  @Field(() => String)
  teamObjectId!: string;
  @Field(() => String)
  role: string;
}

@ObjectType()
export class TeamMemberOutput {
  @Field(() => User)
  user: User;
  @Field(() => Team)
  team: Team;
  @Field(() => String)
  role: string;
}

@InputType()
export class addUserToTeamInput {
  @Field(() => String)
  teamObjectId!: string;
  @Field(() => String)
  userObjectId!: string;
}

@InputType()
export class removeUserFromTeamInput {
  @Field(() => String)
  teamObjectId!: string;
  @Field(() => String)
  userObjectId!: string;
}
