import { InputType, Field } from 'type-graphql';

@InputType()
export class getOrganizationInput {
  @Field(() => String)
  organizationObjectId!: string;
}

@InputType()
export class createOrganizationInput {
  @Field(() => String)
  userObjectId!: string;
  @Field(() => String)
  organizationName: string;
}

@InputType()
export class updateOrganizationInput {
  @Field(() => String)
  organizationObjectId!: string;
  @Field(() => String)
  organizationName!: string;
}
