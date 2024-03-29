import express from "express";
import { StatusCodes } from "http-status-codes";
import uuidv4 from "../../middleware/guid.js";
import { CoursesController } from "./courses.controller.js";
import { ErrorInterceptor } from "../../services/index.services.js";
import { errorMessages } from "../../services/error.mes.js";

export class CoursesRouter {
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
    this.router.get("/", async (req, res) => {
      try {
        const { filter, skip = 0, limit = 10 } = req.query;
        const { courses, count, message, fact } = await this.controller.getAll(
          filter,
          limit,
          skip
        );
        if (fact && message) throw { fact, message };
        res.status(StatusCodes.OK).json({
          reqId: req.uuidv4,
          courses,
          count,
        });
      } catch (err) {
        res
          .status(StatusCodes.NOT_FOUND)
          .json(this.ErrorInterceptor.defaultInterceptor(err, req));
      }
    });
  }

  getById() {
    this.router.get("/:id", async (req, res) => {
      try {
        const id = req.params.id;
        const { course, message, fact } = await this.controller.getById(id);
        if (fact && message) throw { fact, message };
        res.status(StatusCodes.OK).json({
          reqId: req.uuidv4,
          course,
        });
      } catch (err) {
        res
          .status(StatusCodes.NOT_FOUND)
          .json(this.ErrorInterceptor.defaultInterceptor(err, req));
      }
    });
  }

  create() {
    this.router.post("/", async (req, res) => {
      try {
        const { title, author, site, isFree, type } = req.body;
        const { course, message, fact } = await this.controller.create({
          title,
          author,
          site,
          isFree,
          type,
        });
        if (fact && message) throw { fact, message };
        res.status(StatusCodes.CREATED).json({
          reqId: req.uuidv4,
          message: errorMessages.successMessagePost,
          data: { course },
        });
      } catch (err) {
        let status = StatusCodes.NOT_FOUND;
        if (err.message === errorMessages.postMessage) {
          status = StatusCodes.BAD_REQUEST;
        }
        res
          .status(status)
          .json(this.ErrorInterceptor.defaultInterceptor(err, req));
      }
    });
  }

  update() {
    this.router.put("/:id", async (req, res) => {
      try {
        const { title, author, site, isFree, type } = req.body;
        const id = req.params.id;
        const newCourse = { title, author, site, isFree, type };
        const { updatedCourse, message, fact } = await this.controller.update(
          id,
          newCourse
        );
        if (fact && message) throw { fact, message };
        res.status(StatusCodes.OK).json({
          reqId: req.uuidv4,
          message: errorMessages.successMessagePut,
          data: { updatedCourse },
        });
      } catch (err) {
        res
          .status(StatusCodes.NOT_FOUND)
          .json(this.ErrorInterceptor.defaultInterceptor(err, req));
      }
    });
  }

  delete() {
    this.router.delete("/:id", async (req, res) => {
      try {
        const id = req.params.id;
        const { message, fact } = await this.controller.delete(id);
        if (fact && message) throw { fact, message };
        res.status(StatusCodes.OK).json({
          reqId: req.uuidv4,
          message: errorMessages.successMessageDel,
        });
      } catch (err) {
        res
          .status(StatusCodes.NOT_FOUND)
          .json(this.ErrorInterceptor.defaultInterceptor(err, req));
      }
    });
  }
}
