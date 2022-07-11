import { Schema, model } from 'mongoose';

const actionSchema = new Schema({
  title: String,
  previousValue: String,
  newValue: { type: String, required: true },
  actioneer: { type: String, required: true },
});

const ActionModel = model('Action', actionSchema);

export default ActionModel;
