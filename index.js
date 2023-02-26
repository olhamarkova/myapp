import express from 'express';
import path from 'path';
import morgan from 'morgan';
import { MainRouter, LoginRouter, CatalogRouter, UsersRouter } from './routes/index.js';
import requestTime from './middleware.js';
import mongoose from 'mongoose';
import UserSchema from './schemas/users.model.js';

const app = express();
const port = 3000;
let User = null;
//const __dirname = path.resolve();

async function start () {
  try {
    User = mongoose.model("users", UserSchema);
    
    await mongoose.connect('mongodb://admin:123456@127.0.0.1:27017');
    console.log(mongoose.connection.name);
    console.log('Connected!');
    app.listen(port, () => {
      console.log(`This server has been started on port ${port}...`);
    });
  } catch(error) {
    console.log(error)
  }
};

mongoose.set('strictQuery', false);

//app.use(express.static('static'));
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use('/', MainRouter);
app.use('/login', LoginRouter);
app.use('/catalog', CatalogRouter);
app.use('/users', UsersRouter);
//app.use(requestTime);

app.use(function(req, res, next) {
  res.status(404);
  res.json({error: "Route not found or you should try another method"});
  next();
 });

 start();

/* app.listen(port, () => {
  console.log(`This server has been started on port ${port}...`);
}); */

export const UserModel = User;
