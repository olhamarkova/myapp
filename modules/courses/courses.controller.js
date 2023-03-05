import CoursesService from './courses.service.js';

export default class CoursesRouter {
  constructor() {
    this.service = new CoursesService();
  }

  getById(filter) {
    return this.service.getById(filter);
  }

  getAll(filter, limit, skip) {
    return this.service.getAll(filter, limit, skip);
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
}
