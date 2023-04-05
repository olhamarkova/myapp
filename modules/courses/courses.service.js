import { CoursesModel } from "./courses.model.js";

export class CoursesService {
  constructor() {
    this.model = new CoursesModel();
    this.modelMapping = new Map([
      ["type", "type"],
      ["author", "author"],
      ["free", "isFree"],
    ]);
  }

  async getById(filter) {
    const course = await this.model.getById(filter);
    return course;
  }

  async getAll(filter, limit, skip) {
    if (limit < 0) {
      limit = Math.abs(limit);
    } else if (limit - (limit % 1) !== 0) {
      limit = Math.round(limit);
    }
    if (skip < 0) {
      skip = Math.abs(skip);
    } else if (skip - (skip % 1) !== 0) {
      skip = Math.round(skip);
    }
    const filterObj = this.parseFilter(filter);
    const courses = await this.model.getAll(filterObj, limit, skip);
    const count = await this.model.getCount(filterObj);
    return {
      courses,
      count,
    };
  }

  parseFilter(filter) {
    try {
      const filterParams = filter.split(",");
      return filterParams.reduce((acc, el) => {
        const paramValues = el.split(":");
        let key = null;
        if (this.modelMapping.has(paramValues[0]))
          key = this.modelMapping.get(paramValues[0]);
        if (key) acc[key] = paramValues[1];
        return acc;
      }, {});
    } catch (err) {
      return {};
    }
  }

  async create(payload) {
    const data = await this.model.create(payload);
    return data;
  }

  async update(id, newCourse) {
    return await this.model.update(id, newCourse);
  }

  async delete(id) {
    return await this.model.delete(id);
  }
}
