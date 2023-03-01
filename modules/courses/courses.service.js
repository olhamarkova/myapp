import CoursesModel from './courses.model.js';

export default class CoursesService {
  constructor() {
    this.model = new CoursesModel();
  }

  getById(filter) {
    return this.model.getById(filter);
  }

  getAll(type, limit, skip) {
    return this.model.getAll(type, limit, skip);
  }

  create(payload) {
    return this.model.create(payload);
  }

  update(id, newCourse) {
    return this.model.update(id, newCourse);
  }

  delete(id) {
    return this.model.delete(id);
  }
}
