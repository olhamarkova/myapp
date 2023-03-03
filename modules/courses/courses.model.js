import schema from "./courses.schema.js";
import mongoose from 'mongoose';

export default class CoursesModel {
  constructor() {
    this.model = mongoose.model("courses", schema);
  }

  async getById(filter) {
    const data = await this.model.findById(filter);
    return this.defaultDto(data);
  }

  async getAll(type, limit, skip) {
    const data = await this.model.find(!type ? {} : { type }).limit(limit).skip(skip);
    return data.map(this.defaultDto);
  }

  async create(payload) {
    const data = await this.model.create(payload);
    return this.defaultDto(data);
  }

  async update(id, newCourse) {
    const data = await this.model.findById(id);
    if (!data) throw new Error("Wrong id.");
    let check;
    Object.values(newCourse).forEach((el) => {
      if (typeof el === 'undefined') {
      return check = true
      }
    });
    if(check) throw new Error("Hey! You should create a body!");
    const newData = await this.model.updateOne( {_id: id}, newCourse, {new: true} );
    const newCourse1 = await this.model.findById(id);
    return this.defaultDto(newCourse1);
  }

  async delete(id) {
    const data = await this.model.deleteOne( {_id: id, savable: false } );
    if(data.deletedCount === 0) throw new Error("This course can't be deleted");
    return this.defaultDto(data);
    }
  

  defaultDto(payload) {
    const data = {
      id: payload._id,
      title: payload.title,
      author: payload.author,
      free: payload.isFree,
      resource: payload.site,
      category: payload.type,
    };
    return data 
  }
}
