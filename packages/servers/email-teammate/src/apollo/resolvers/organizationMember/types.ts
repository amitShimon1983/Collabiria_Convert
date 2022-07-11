import { Organization, User } from '@harmonie/server-db';
import { InputType, Field, ObjectType } from 'type-graphql';

@InputType()
export class getUserOrganizationsInput {
  @Field(() => String)
  userObjectId!: string;
  @Field(() => String)
  role: string;
}
@InputType()
export class getOrganizationMembersInput {
  @Field(() => String)
  organizationObjectId!: string;
  @Field(() => String)
  role: string;
}

@ObjectType()
export class OrganizationMemberOutput {
  @Field(() => User)
  user: User;
  @Field(() => Organization)
  organization: Organization;
  @Field(() => String)
  role: string;
}

@InputType()
export class addMemberToOrganizationInput {
  @Field(() => String)
  organizationObjectId!: string;
  @Field(() => String)
  userObjectId!: string;
}
