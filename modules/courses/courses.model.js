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

  async getAll(filterObj, limit, skip) {
    const data = await this.model.find(filterObj).limit(limit).skip(skip);
    return data.map(this.defaultDto);
  }

  async getCount(filterObj) {
    const count = await this.model.count(filterObj);
    return count;
  }

  async create(payload) {
    const data = await this.model.create(payload);
    return this.defaultDto(data);
  }

  async update(id, newCourse) {
    const data = await this.model.findById(id);
    if (!data) throw new Error("Wrong ID");
    if(data.savable) throw new Error("This course cannot be updated");
    let check;
    Object.values(newCourse).forEach((el) => {
      if (typeof el === 'undefined') {
      return check = true
      }
    });
    if(check) throw new Error("Need all required fields");
    const newData = await this.model.findOneAndUpdate( {_id: id}, newCourse, {new: true} );
    return this.defaultDto(newData);
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
