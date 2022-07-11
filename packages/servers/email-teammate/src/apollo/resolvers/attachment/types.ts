import { InputType, Field } from 'type-graphql';

@InputType()
export class getAttachmentsInput {
  @Field(() => String)
  messageId!: string;
}
