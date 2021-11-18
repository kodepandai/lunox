import pkg from "node-input-validator/cjs/index";
const { Validator: niv } = pkg;
import type { ObjectOf } from "../Types";
class Validator extends niv {
  constructor(
    data: ObjectOf<any>,
    rules: ObjectOf<any>,
    messages: ObjectOf<any>,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    customAttributes: ObjectOf<any> = {}
  ) {
    // TODO: implement validation with customAtributes like in laravel
    super(data, rules, messages);
  }
}

export default Validator;
