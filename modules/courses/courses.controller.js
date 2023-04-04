import CoursesService from './courses.service.js';
import { UselessFact } from '../../services/index.services.js';
import { errorMessages } from "../../services/error.mes.js";

export default class CoursesRouter {
  constructor() {
    this.service = new CoursesService();
    this.uselessFactsServise = new UselessFact();
  }

  async getById(filter) {
    try {
      const course = await this.service.getById(filter);
      return { course };
    } catch(err) {
      const fact = await this.uselessFactsServise.getFact();
      return {
        message: err.message,
        fact,
      }
    }
  }

  async getAll(filter, limit, skip) {
    try {
      return await this.service.getAll(filter, limit, skip);
    } catch(err) {
      return {
        message: err.message,
        fact: await this.uselessFactsServise.getFact(),
      }
    }
  }

  async create(payload) {
    try {
      const { title, author, site, type } = payload;
      if (!title || !author|| !site || !type) throw new Error(errorMessages.postMessage);
      const course = await this.service.create(payload);
      return { course };
    } catch(err) {
      return {
        message: err.message,
        fact: await this.uselessFactsServise.getFact(),
      }
    }
  }

  async update(id, newCourse) {
    try {
    const updatedCourse = await this.service.update(id, newCourse);
    return { updatedCourse };
    } catch(err) {
      return {
        message: err.message,
        fact: await this.uselessFactsServise.getFact(),
      }
    }
  }

  async delete(id) {
    try {
    const deleteCourse = await this.service.delete(id);
    return { deleteCourse };
    } catch(err) {
      return {
        message: err.message,
        fact: await this.uselessFactsServise.getFact(),
      }
    }
  }
}
