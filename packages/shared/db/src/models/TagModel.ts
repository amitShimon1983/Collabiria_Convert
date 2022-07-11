import { Schema, model } from 'mongoose';

const tagSchema = new Schema({
  name: { type: String, required: true, maxLength: 32 },
  taskBoardId: { type: Schema.Types.ObjectId, ref: 'TaskBoard', required: true },
});

tagSchema.index({ taskBoardId: 1, name: 1 }, { unique: true, sparse: true });

const TagModel = model('Tag', tagSchema);

export default TagModel;
