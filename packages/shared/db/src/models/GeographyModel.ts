import { Schema, model } from 'mongoose';

const geographySchema = new Schema({
  timezone: {
    type: String,
  },
});

const GeographyModel = model('Geography', geographySchema);

export default GeographyModel;
