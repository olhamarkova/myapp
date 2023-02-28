import express from 'express';
import uuidv4 from '../guid.js';
import { CoursesModel } from '../index.js';

const router = express.Router();

router.use(uuidv4);

router.get('/', async (req, res) => {
  try {
    const { type, skip = 0, limit = 5 } = req.query; 
    const courses = await CoursesModel.find(!type ? {} : { type }).limit(limit).skip(skip);
    res.status(200).json({
      courses,
    });
  } catch (err) {
    res.status(404).json({
      message: err.message,
      content: null
    });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const id = req.params.id; 
    const course = await CoursesModel.findOne({_id: id});
    if(!course) {
      res.status(404).json({
        message: "This course is not exists"
      });
    } else {
    res.status(200).json({
      course,
    });
  } 
} catch (err) {
    res.status(404).json({
      message: err.message,
      content: null
    });
  }
});

router.post('/', async (req, res) => {
  try {
    const { title, autor, resourse, isFree, type } = req.body;
    if (!title || !autor|| !resourse || !type) throw new Error("Need to provide all required fields.");
    const course = await CoursesModel.create({ 
      title,
      autor,
      resourse,
      isFree,
      type,
    });
    res.status(201).json({
      reqId: req.uuidv4,
      message: "Course is created",
      data: { course },
      time: req.requestTime,
    });
  } catch(err) {
    res.status(404).json({
      reqId: req.uuidv4,
      message: err.message,
      data: null,
      time: req.requestTime,
    });
  }
});

router.put('/:id', async (req, res) => {
  try {
    if(!req.body) return res.sendStatus(400);
    const { title, autor, resourse, isFree, type } = req.body;
    const id = req.params.id;
    const newCourse = { title, autor, resourse, isFree, type, };
    const course = await CoursesModel.findOneAndUpdate( {_id: id}, newCourse, {new: true} );
    if(course) res.send(course);
} catch(err) {
    res.status(404).json({
      reqId: req.uuidv4,
      message: err.message,
      data: null,
      time: req.requestTime,
    });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const course = await CoursesModel.findOneAndRemove( {_id: id} );
    if(!course) {
      res.status(400).json({
        message: "Wrong ID or course is not exsits"
      });
    } else {
      res.status(200).json({
        message: "Course was successfuly deleted" 
    }); 
  }
} catch(err) {
    res.status(404).json({
      reqId: req.uuidv4,
      message: err.message,
      data: null,
      time: req.requestTime,
    });
  }
});

export { router };
