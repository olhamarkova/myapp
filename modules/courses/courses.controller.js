import CoursesService from './courses.service.js';
import UselessFactsServise from '../../services/useless-facts.service.js';

export default class CoursesRouter {
  constructor() {
    this.service = new CoursesService();
    this.uselessFactsServise = new UselessFactsServise();
  }

  getById(filter) {
    return this.service.getById(filter);
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

  create(payload) {
    return this.service.create(payload);
  }

  update(id, newCourse) {
    return this.service.update(id, newCourse);
  }

  delete(id) {
    return this.service.delete(id)
  }

  getFact() {
    return this.uselessFactsServise.get(); 
  }
}
