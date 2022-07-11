import { Schema, model } from 'mongoose';

const statusSchema = new Schema({
  title: String,
  color: String,
});

const StatusModel = model('Status', statusSchema);

export default StatusModel;
