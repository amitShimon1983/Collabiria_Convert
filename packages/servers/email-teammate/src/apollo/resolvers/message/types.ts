import { Message } from '@harmonie/server-db';
import { InputType, Field, ObjectType, ID, Int } from 'type-graphql';

@InputType()
export class getMessagesInput {
  @Field(() => String)
  messageObjectId!: string;
}

@InputType()
export class GetEmailDataArgs {
  @Field(() => String, { nullable: true })
  itemId?: string;
}

@InputType()
export class GetMailsArgs {
  @Field(() => Boolean, { nullable: true })
  onlyRead?: boolean;
  @Field(() => String, { nullable: true })
  searchTerm?: string;
  @Field(() => String, { nullable: true })
  scope?: string;
  @Field(() => String, { nullable: true })
  endCursor?: string;
}

@ObjectType()
export class PageInfo {
  @Field(() => String, { nullable: true })
  endCursor?: string;
  @Field()
  hasNextPage!: boolean;
}

@ObjectType()
export class MailQuery {
  @Field(() => [Message])
  results!: [Message];
  @Field(() => PageInfo, { nullable: true })
  pageInfo?: PageInfo;
  @Field(() => Boolean, { nullable: true })
  isAuthorized: boolean;
}

@InputType()
export class GetEmailAttachmentsArgs {
  @Field({ nullable: true })
  id?: string;
}

@ObjectType()
export class InlineAttachment {
  @Field({ nullable: true })
  contentType!: string;
  @Field({ nullable: true })
  contentBytes!: string;
  @Field({ nullable: true })
  contentId!: string;
}

@ObjectType()
export class MailFolder {
  @Field(() => ID)
  id!: string;
  @Field(() => String, { nullable: true })
  displayName?: string;
  @Field(() => String, { nullable: true })
  parentFolderId?: string;
  @Field(() => Int, { nullable: true })
  unreadItemCount?: number;
  @Field(() => Int, { nullable: true })
  totalItemCount?: number;
  @Field(() => String, { nullable: true })
  wellKnownName?: string;
}

@InputType()
export class createMessagesInput {
  @Field(() => String)
  teamId!: string;
  @Field(() => String)
  messageId!: string;
  @Field(() => String)
  body!: string;
}

@InputType()
export class Filters {
  @Field(() => String)
  from: string;
  @Field(() => String)
  to: string;
  @Field(() => String)
  subject: string;
}

@InputType()
export class getTeamRootMessagesInput {
  @Field(() => String)
  teamObjectId!: string;
  @Field(() => Filters)
  filters: Filters;
  @Field(() => String)
  searchText: string;
  @Field(() => Number)
  skip: number;
  @Field(() => Number)
  limit: number;
}

@ObjectType()
export class getTeamRootMessagesOutput {
  @Field(() => [Message])
  records!: string;
  @Field(() => Number)
  total: number;
  @Field(() => Number)
  page: number;
  @Field(() => Number)
  endCursor: number;
  @Field(() => Boolean)
  hasNextPage: boolean;
}
