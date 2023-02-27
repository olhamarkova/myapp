import express from 'express';
import uuidv4 from '../guid.js';
import { CoursesModel } from '../index.js';

const router = express.Router();

router.use(uuidv4);

router.get('/', async (req, res) => {
  try {
    const { type, skip, limit } = req.query;
    if (type) { 
    const coursesType = await CoursesModel.find({type});
      res.status(200).json({
          coursesType,
        });
    } else {
    const courses = await CoursesModel.find();
    res.status(200).json({
        courses,
      });
    };
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
    if (!title || !autor|| !resourse || !isFree || !type) throw new Error("Need to provide all required fields.");
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

export { router };