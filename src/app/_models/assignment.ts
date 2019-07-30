import {Deserializable} from "./deserializable";

export class Assignment implements Deserializable {
  id:number;
  answer: string;
  due_date: Date;
  post_date: Date;
  question: string;
  specific_class_id: number;

  deserialize(input: any): this {
    Object.assign(this, input);
    return this;
  }
}