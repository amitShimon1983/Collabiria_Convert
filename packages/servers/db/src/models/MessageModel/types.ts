import { prop } from '@typegoose/typegoose';
import { ObjectType, Field, registerEnumType } from 'type-graphql';

export enum Importance {
  low = 'low',
  normal = 'normal',
  high = 'high',
}

registerEnumType(Importance, {
  name: 'Importance',
});

@ObjectType()
export class EmailAddress {
  @Field(() => String)
  @prop({ type: () => String })
  name?: string;
  @Field(() => String)
  @prop({ type: () => String })
  address?: string;
}

@ObjectType()
export class Recipient {
  @Field(() => EmailAddress)
  @prop({ type: () => EmailAddress })
  emailAddress: EmailAddress;
}

@ObjectType()
export class Body {
  @Field(() => String)
  @prop({ type: () => String })
  content: string;
  @Field(() => String)
  @prop({ type: () => String, required: true })
  contentType: string;
}
