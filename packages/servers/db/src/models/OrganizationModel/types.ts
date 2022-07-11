import { prop } from '@typegoose/typegoose';
import { ObjectType, Field } from 'type-graphql';

@ObjectType()
export class License {
  @Field(() => String)
  @prop({ type: () => String })
  name?: string;
  @Field(() => String)
  @prop({ type: () => String })
  type?: string;
}
