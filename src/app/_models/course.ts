import {Deserializable} from "./deserializable";
import { Data } from "@angular/router";
import { Term } from "./term";
import { User } from "./user";
import { SchoolCourse } from "./schoolClass";

export class Course implements Deserializable {
  id:number;
  instructor_id:number;
  end_time: Date;
  start_time:Date;
  class_start_date:Date;
  class_end_date:Date;
  class_no:string;
  term_id:string;
  section_id:string;
  room:string;
  term:Term;
  instructor:User;
  school_class:SchoolCourse;
  deserialize(input: any): this {
    Object.assign(this, input);
    this.school_class = new SchoolCourse().deserialize(input.school_class);
    return this;
  }
}