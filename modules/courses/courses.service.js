import CoursesModel from './courses.model.js';

export default class CoursesService {
  constructor() {
    this.model = new CoursesModel();
  }

  getById(filter) {
    return this.model.getById(filter);
  }

  async getAll(type, limit, skip) {
    const courses = await this.model.getAll(type, limit, skip);
    const count = await this.model.getCount(type);
    return {
      courses,
      count,
    };
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
