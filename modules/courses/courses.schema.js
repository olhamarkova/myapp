import { Schema, model, ObjectId } from 'mongoose';
import types from './courses.enum.js';

const schema = new Schema({
  title: {
    type: String,
    required: true,
    maxlength: 355,
    minlength: 1,
    trim: true
  },
  author: {
    type: String,
    required: true,
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
    required: true,
    maxlength: 355,
    minlength: 1,
    trim: true
  },
  type: {
    type: String,
    required: true,
    enum: [types.qa, types.aqa, types.eng],
  },
  savable: {
    type: Boolean,
    required: false,
    trim: true,
    default: false,
  }
});

export default schema;
