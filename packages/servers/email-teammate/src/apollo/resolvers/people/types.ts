import { Field, ID, InputType, ObjectType } from 'type-graphql';

@ObjectType()
export class MailPerson {
  @Field({ nullable: true })
  name?: string;
  @Field({ nullable: true })
  address?: string;
  @Field({ nullable: true })
  html?: string;
}

@ObjectType()
export class ProfilePicture {
  @Field(() => ID)
  principalName!: string;
  @Field(() => String, { nullable: true })
  base64ByteArray?: string;
}

@InputType()
export class GetProfilePictureArgs {
  @Field()
  principalName!: string;
}

@InputType()
export class FindPeopleArgs {
  @Field(() => String, { nullable: true })
  text?: string;
}
