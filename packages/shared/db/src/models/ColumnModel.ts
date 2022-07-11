import { Schema, model } from 'mongoose';

const columnSchema = new Schema({
  title: String,
  created: { type: Date, default: Date.now, immutable: true },
  visibleStatuses: [{ type: Schema.Types.ObjectId, ref: 'Status' }],
  isDefault: { type: Boolean, default: false },
  icon: { type: String, default: '' },
  order: { type: Number },
});

columnSchema.index({ order: 1 });

const ColumnModel = model('Column', columnSchema);

export default ColumnModel;
