import { Schema, model, ObjectId } from 'mongoose';

const schema = new Schema({
  title: {
    type: String,
    required: false,
    maxlength: 355,
    minlength: 1,
    trim: true
  },
  author: {
    type: String,
    required: false,
    maxlength: 50,
    minlength: 1,
    trim: true
  },
  isFree: {
    type: Boolean,
    required: false,
    trim: true,
    default: null,
  },
  site: {
    type: String,
    required: false,
    maxlength: 355,
    minlength: 1,
    trim: true
  },
  type: {
    type: String,
    required: true,
    default: null
  },
  savable: {
    type: Boolean,
    required: false,
    trim: true,
    default: false,
  }
});

export default schema;
