import { Schema, model } from 'mongoose';
import TagModel from './TagModel';

const taskSchema = new Schema({
  title: { type: String, required: true },
  description: String,
  mailboxId: String,
  messageId: { type: String, required: true },
  issuer: { type: Schema.Types.ObjectId, ref: 'User', required: true, immutable: true },
  status: { type: Schema.Types.ObjectId, ref: 'Status', required: true },
  owner: { type: Schema.Types.ObjectId, ref: 'User' },
  created: { type: Date, default: Date.now, immutable: true },
  closeDate: { type: Date, default: null },
  assigneeDate: Date,
  actions: [{ type: Schema.Types.ObjectId, ref: 'Action' }],
  conversationRef: { type: { id: String, activityId: String } },
  createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  emailInfo: { type: Schema.Types.ObjectId, ref: 'EmailInfo' },
  conversations: [{ type: Schema.Types.ObjectId, ref: 'EmailInfo' }],
  tags: [{ type: Schema.Types.ObjectId, ref: 'Tag', required: false, default: [TagModel] }],
  taskBoard: { type: Schema.Types.ObjectId, ref: 'TaskBoard', required: true },
  isDeleted: { type: Boolean, default: false },
  priority: { type: Number, default: 0 },
});

taskSchema.index({ priority: 1 });
taskSchema.index({ tags: 1 });
taskSchema.index({ '$**': 'text', _type: 1 }, { default_language: 'none' });
const TaskModel = model('Task', taskSchema);

export default TaskModel;
