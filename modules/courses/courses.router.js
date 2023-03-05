import CoursesController from './courses.controller.js';
import uuidv4 from '../../middleware/guid.js';
import express from 'express';

export default class CoursesRouter {
  constructor() {
    this.router = express.Router();
    this.router.use(uuidv4);
    this.controller = new CoursesController();
    this.init();
  }

  init() {
    this.getAll();
    this.getById();
    this.create();
    this.update();
    this.delete();

  } 

  getAll() {
    this.router.get('/', async (req, res) => {
      try {
        const { type, skip = 0, limit = 10 } = req.query; 
        const { courses, count } = await this.controller.getAll(type, limit, skip);
        res.status(200).json({
          courses,
          count,
        });
      } catch (err) {
        res.status(404).json({
          message: "Something went wrong. Please check and try again",
          content: null
        });
      }
    });
  }

  getById() {
    this.router.get('/:id', async (req, res) => {
      try {
        const id = req.params.id; 
        const course = await this.controller.getById(id);
        if(course) {
        res.status(200).json({
          course,
        });
      } 
    } catch (err) {
        res.status(404).json({
          message: "Something went wrong. Please check and try again",
          content: null
        });
      }
    });
  }

  create() {
    this.router.post('/', async (req, res) => {
      try {
        const { title, author, site, isFree, type } = req.body;
        if (!title || !author|| !site || !type) throw new Error("Need to provide all required fields.");
        const course = await this.controller.create({ 
          title,
          author,
          site,
          isFree,
          type,
        });
        res.status(201).json({
          reqId: req.uuidv4,
          message: "Course is created",
          data: { course },
        });
      } catch(err) {
        res.status(404).json({
          reqId: req.uuidv4,
          message: "Something went wrong. Please check and try again",
          data: null,
        });
      }
    });
  }

  update() {
    this.router.put('/:id', async (req, res) => {
      try {
        const { title, author, site, isFree, type } = req.body;
        const id = req.params.id;
        const newCourse = { title, author, site, isFree, type, };
        const course = await this.controller.update(id, newCourse);
        if(course) res.send(course);
    } catch(err) {
        res.status(404).json({
          reqId: req.uuidv4,
          message: err.message,
          data: null,
        });
      }
    });
  }

  delete() {
    this.router.delete('/:id', async (req, res) => {
      try {
        const id = req.params.id;
        const course = await this.controller.delete(id);
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
        });
      }
    });
  }
}
