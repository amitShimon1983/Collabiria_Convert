import { Schema, model } from 'mongoose';
export const RoleType = Object.freeze({
  owner: 'owner',
});
const roleSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  taskBoard: { type: Schema.Types.ObjectId, ref: 'TaskBoard', required: true },
  roleType: {
    type: String,
    enum: Object.values(RoleType),
    default: 'owner',
  },
});
// roleSchema.index({ taskBoardId: 1, user: 1 }, { unique: true, sparse: true });
const RoleModel = model('Role', roleSchema);

export default RoleModel;
