import { Schema, model } from 'mongoose';

const taskBoardSchema = new Schema({
  title: String,
  channelId: { type: String, required: true },
  teamId: { type: String, required: true },
  groupId: { type: String, required: true },
  columns: [{ type: Schema.Types.ObjectId, ref: 'Column', required: true }],
  creator: { type: String, required: true, immutable: true },
  type: String,
  users: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  created: { type: Date, default: Date.now, immutable: true },
  isDeleted: { type: Boolean, default: false },
  lastAccessDate: Date,
  isTest: { type: Boolean, default: false },
  channelWebUrl: String,
  channelRelativeUrl: String,
});

const TaskBoardModel = model('TaskBoard', taskBoardSchema);

export default TaskBoardModel;
