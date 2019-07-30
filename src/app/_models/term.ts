import {Deserializable} from "./deserializable";

export class Term implements Deserializable {
  id:number;
  description: string;

  deserialize(input: any): this {
    Object.assign(this, input);
    return this;
  }
}