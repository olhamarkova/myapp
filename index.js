import express from 'express';
import morgan from 'morgan';
import mongoose from 'mongoose';
import CourseRouter from './modules/courses/courses.router.js'; 

const courseRouter = new CourseRouter();
const app = express();
const port = 3000;

async function start () {
  try {
    await mongoose.connect('mongodb://admin:123456@127.0.0.1:27017');
    console.log('Connected!');
    app.listen(port, () => {
      console.log(`This server has been started on port ${port}...`);
    });
  } catch(error) {
    console.log(error)
  }
};

mongoose.set('strictQuery', false);

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use('/courses', courseRouter.router);

app.use(function(req, res, next) {
  res.status(404);
  res.json({error: "Route not found or you should try another method"});
  next();
 });

 start();
