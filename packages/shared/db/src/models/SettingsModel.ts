import { Schema, model } from 'mongoose';

const DragPermissions = Object.freeze({
  notify: 'notify',
  doNotNotify: 'doNotNotify',
  askMeEachTime: 'askMeEachTime',
});

const settingsSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  taskBoard: { type: Schema.Types.ObjectId, ref: 'TaskBoard', required: true },
  dragPermission: {
    type: String,
    enum: Object.values(DragPermissions),
  },
  walkthroughCompleted: { type: Boolean, default: false },
  notifyOnTaskAssigned: { type: Boolean, default: false },
  notifyOnTaskReplay: { type: Boolean, default: false },
  firstUsage: String,
  lastUsage: String,
});

const SettingsModel = model('Settings', settingsSchema);

export default SettingsModel;
