import { InputType, Field } from 'type-graphql';

@InputType()
export class getTeamInput {
  @Field(() => String)
  teamObjectId!: string;
}

@InputType()
export class createTeamInput {
  @Field(() => String)
  organizationObjectId!: string;
  @Field(() => String)
  userObjectId!: string;
  @Field(() => String)
  teamName!: string;
}

@InputType()
export class updateTeamInput {
  @Field(() => String)
  organizationObjectId!: string;
  @Field(() => String)
  teamObjectId!: string;
  @Field(() => String)
  teamName!: string;
}

@InputType()
export class getOrganizationTeamsInput {
  @Field(() => String)
  organizationObjectId!: string;
}

@InputType()
export class getOrganizationsTeamsInput {
  @Field(() => [String])
  organizationObjectIds!: string[];
}
