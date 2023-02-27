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

//put request