import { Schema, model } from 'mongoose';

const attachmentSchema = new Schema({
  name: String,
  type: String,
  contentType: String,
  taskId: String,
  uri: String,
  itemId: String,
  driveId: String,
  size: Number,
  iconUrl: String,
  attachmentId: String,
  emailId: { type: String, required: true },
  isInline: { type: Boolean, default: false },
  contentId: String,
});

const AttachmentModel = model('Attachment', attachmentSchema);

export default AttachmentModel;
