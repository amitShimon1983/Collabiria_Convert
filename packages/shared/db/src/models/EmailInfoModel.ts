import { Schema, model } from 'mongoose';

const emailInfoSchema = new Schema({
  emailId: { type: String, required: true },
  body: { type: String },
  editedBody: { type: String },
  subject: { type: String },
  previewText: { type: String },
  sharedFrom: String,
  conversationId: { type: String, required: true },
  task: { type: Schema.Types.ObjectId, ref: 'Task' },
  from: { type: { name: String, address: String, html: String } },
  to: { type: [{ name: String, address: String, html: String }] },
  cc: { type: [{ name: String, address: String, html: String }] },
  sentDateTime: { type: String, required: true },
  webUrl: { type: String },
  rawUrl: { type: String },
  attachments: [{ type: Schema.Types.ObjectId, ref: 'Attachment' }],
  emailCardId: String,
  isDraft: { type: Boolean, default: false },
});

emailInfoSchema.index({ emailId: 1 }, { sparse: true });
const EmailInfoModel = model('EmailInfo', emailInfoSchema);

export default EmailInfoModel;
