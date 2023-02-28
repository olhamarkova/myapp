import { Schema, model, ObjectId } from 'mongoose';

const schema = new Schema({
  title: {
    type: String,
    required: false,
    maxlength: 355,
    minlength: 2,
    trim: true
  },
  autor: {
    type: String,
    required: false,
    maxlength: 50,
    minlength: 4,
    trim: true
  },
  isFree: {
    type: Boolean,
    required: false,
    maxlength: 6,
    minlength: 6,
    trim: true,
    default: null,
  },
  resourse: {
    type: String,
    required: false,
    maxlength: 355,
    minlength: 6,
    trim: true
  },
  type: {
    type: String,
    required: true,
    default: null
  },
});

export default schema;
