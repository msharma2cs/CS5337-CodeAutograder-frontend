import {Deserializable} from './deserializable';

export class SchoolCourse implements Deserializable {
  class_no: number;
  description: string;

  deserialize(input: any): this {
    Object.assign(this, input);
    return this;
  }

}
