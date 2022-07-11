import { Aggregate, model, Query, Schema, Types } from 'mongoose';
import { IMessageRuleModel, PredicateTypes, IMessageRuleDocument, IMessageRuleGroup } from './types';

const schema: Schema<IMessageRuleDocument, IMessageRuleModel> = new Schema({
  taskBoard: { type: Schema.Types.ObjectId, ref: 'TaskBoard', required: true },
  mailboxId: { type: String, required: true },
  predicate: {
    type: { type: String, enum: Object.values(PredicateTypes), required: true },
    input: { type: String, required: true },
  },
});

schema.index({ mailboxId: 1 });
schema.index({ taskBoard: 1 });

schema.statics.groupRulesByTaskBoard = async function (
  mailboxId: string
): Promise<Aggregate<Array<IMessageRuleGroup>>> {
  return this.aggregate([{ $match: { mailboxId } }, { $group: { _id: '$taskBoard', rules: { $push: '$$ROOT' } } }]);
};

schema.statics.createDefault = async function (
  mailboxId: string,
  taskBoard: Types.ObjectId
): Promise<IMessageRuleDocument> {
  const exist = await this.findOne({ mailboxId, taskBoard });

  if (exist) {
    return exist;
  }

  return await this.create({
    mailboxId,
    taskBoard,
    predicate: {
      type: PredicateTypes.toAddressIn,
      input: `['${mailboxId}']`,
    },
  });
};

schema.statics.deleteDefault = async function (
  taskBoard: Types.ObjectId
): Promise<Query<IMessageRuleDocument | null, IMessageRuleDocument>> {
  return this.findOneAndRemove({ taskBoard });
};

export default model<IMessageRuleDocument, IMessageRuleModel>('MessageRule', schema);
