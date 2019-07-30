import {Deserializable} from "./deserializable";

export class User implements Deserializable {
  id:number;
  name: string;
  email: string;
  cin: string;
  type: string;
  password: string;
  enabled:boolean;

  deserialize(input: any): this {
    Object.assign(this, input);
    return this;
  }
}