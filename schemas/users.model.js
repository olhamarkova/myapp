import { Schema, model, ObjectId } from 'mongoose';
// import { mongoConnect } from '../index.js';

const schema = new Schema({
  name: {
    type: String,
    required: true,
    maxlength: 25,
    minlength: 2,
    trim: true
  },
  email: {
    type: String,
    required: true,
    maxlength: 25,
    minlength: 4,
    trim: true
  },
  phone: {
    type: String,
    required: true,
    maxlength: 20,
    minlength: 13,
    trim: true
  },
  created: {
    type: Date,
    default: Date.now()
  },
});

schema.methods.getNameInUpperCase = function(){
  let name = this.firstName + ' ' + this.lastName;
  return name.toUpperCase();
};

// export default mongoConnect.model('User', schema);

export default schema;
