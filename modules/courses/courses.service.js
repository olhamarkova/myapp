import CoursesModel from './courses.model.js';

export default class CoursesService {
  constructor() {
    this.model = new CoursesModel();
    this.modelMapping = new Map([
      ["type", "type"],
      ["author", "author"],
      ["free", "isFree"],
    ]);
  }

  getById(filter) {
    return this.model.getById(filter);
  }

  async getAll(filter, limit, skip) {
    //throw new Error("my awesome error");
    const filterObj = this.parseFilter(filter); // TODO: bug here
    const courses = await this.model.getAll(filterObj, limit, skip);
    const count = await this.model.getCount(filterObj);
    return {
      courses,
      count,
    };
  }

  parseFilter(filter){
    try {
      const filterParams = filter.split(',');
      return filterParams.reduce((acc, el) => {
        const paramValues = el.split(':');
        let key = null;
        if (this.modelMapping.has(paramValues[0])) key = this.modelMapping.get(paramValues[0]);
        if (key) acc[key] = paramValues[1];
        return acc;
      }, {});
    } catch(err) {
      return {};
    }
    
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

