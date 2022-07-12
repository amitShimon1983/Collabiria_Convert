import { InputType, Field } from 'type-graphql';

@InputType()
export class getUserInput {
  @Field(() => String)
  userObjectId!: string;
}
