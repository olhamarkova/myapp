import CoursesController from './courses.controller.js';
import uuidv4 from '../../middleware/guid.js';
import express from 'express';
import { ErrorInterceptor } from '../../services/index.services.js';

export default class CoursesRouter {
  constructor() {
    this.router = express.Router();
    this.router.use(uuidv4);
    this.controller = new CoursesController();
    this.ErrorInterceptor = ErrorInterceptor;
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
        const { filter, skip = 0, limit = 10 } = req.query;
        const { courses, count, message, fact } = await this.controller.getAll( filter, limit, skip);
        if (fact && message) throw { fact, message };
        res.status(200).json({
          reqId: req.uuidv4,
          courses,
          count,
        });
      } catch (err) {
        res.status(404).json(this.ErrorInterceptor.defaultInterceptor(err, req));
      }
    });
  }

  getById() {
    this.router.get('/:id', async (req, res) => {
      try {
        const id = req.params.id; 
        const { course, message, fact } = await this.controller.getById(id);
        if(fact && message) throw { fact, message };
        res.status(200).json({
          reqId: req.uuidv4,
          course,
        });
      } catch (err) {
        res.status(404).json(this.ErrorInterceptor.defaultInterceptor(err, req));
      }
    });
  }

  create() {
    this.router.post('/', async (req, res) => {
      try {
        const { title, author, site, isFree, type } = req.body;
        const { course, message, fact } = await this.controller.create({ 
          title,
          author,
          site,
          isFree,
          type,
        });
        if(fact && message) throw { fact, message };
        res.status(201).json({
          reqId: req.uuidv4,
          message: "Course is created",
          data: { course },
        });
      } catch(err) {
        let status = 404;
        if(err.message === "Need to provide all required fields.") {
          status = 400;
        }
        res.status(status).json(this.ErrorInterceptor.defaultInterceptor(err, req));
      }
    });
  }

  update() {
    this.router.put('/:id', async (req, res) => {
      try {
        const { title, author, site, isFree, type } = req.body;
        const id = req.params.id;
        const newCourse = { title, author, site, isFree, type, };
        const { updatedCourse, message, fact } = await this.controller.update(id, newCourse);
        if(fact && message) throw { fact, message };
        res.status(200).json({
          reqId: req.uuidv4,
          message: "Course was updated",
          data: { updatedCourse },
        });
    } catch(err) {
      res.status(404).json(this.ErrorInterceptor.defaultInterceptor(err, req));
      }
    });
  }

  delete() {
    this.router.delete('/:id', async (req, res) => {
      try {
        const id = req.params.id;
        const { message, fact } = await this.controller.delete(id);
        if(fact && message) throw { fact, message };
        res.status(200).json({
          reqId: req.uuidv4,
          message: "Course was successfuly deleted", 
        }); 
    } catch(err) {
      res.status(404).json(this.ErrorInterceptor.defaultInterceptor(err, req));
      }
    });
  }
}
