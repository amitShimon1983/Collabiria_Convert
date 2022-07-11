import { Aggregate, Document, Model, Query, Types } from 'mongoose';

export enum PredicateTypes {
  fromAddressEquals = 'fromAddressEquals',
  fromAddressIn = 'fromAddressIn',
  fromAddressDomainEquals = 'fromAddressDomainEquals',
  toAddressIn = 'toAddressIn',
  toAddressDomainEquals = 'toAddressDomainEquals',
  subjectContains = 'subjectContains',
  subjectEquals = 'subjectEquals',
  bodyContains = 'bodyContains',
}

export interface IPredicate {
  type: PredicateTypes;
  input: string;
}

export interface IMessageRule {
  taskBoard: any;
  mailboxId: string;
  predicate: IPredicate;
}

export interface IMessageRuleDocument extends IMessageRule, Document {}

export interface IMessageRuleGroup {
  _id: any;
  rules: IMessageRuleDocument[];
}

export interface IMessageRuleModel extends Model<IMessageRuleDocument> {
  groupRulesByTaskBoard: (mailboxId: string) => Promise<Aggregate<Array<IMessageRuleGroup>>>;
  createDefault: (mailboxId: string, taskBoard: Types.ObjectId) => Promise<IMessageRuleDocument>;
  deleteDefault: (taskBoard: Types.ObjectId) => Promise<Query<IMessageRuleDocument | null, IMessageRuleDocument>>;
}
