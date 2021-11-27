import type Application from "../Foundation/Application";
import type { ObjectOf } from "../Types";
import Validator from "./Validator";

class Factory {
  protected app: Application;

  constructor(app: Application) {
    this.app = app;
  }
  public make(
    data: ObjectOf<any>,
    rules: ObjectOf<string>,
    messages: ObjectOf<string> = {},
    customAttributes: ObjectOf<string> = {}
  ) {
    return new Validator(data, rules, messages, customAttributes);
  }
}
export default Factory;
