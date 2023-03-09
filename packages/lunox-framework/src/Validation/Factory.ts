import type Application from "../Foundation/Application";
import type { ObjectOf } from "../Types";
import Validator from "./Validator";
import { Messages, extend } from "@kodepandai/node-input-validator";
import type { Rule } from "../Contracts/Validation";

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

  public extend(rule: Rule) {
    if (rule.message) {
      Messages.extend({
        [rule.name]: rule.message,
      });
    }
    return extend(rule.name, (args) => ({
      name: rule.name,
      handler: (value: any) => rule.passes(args, value),
    }));
  }
}
export default Factory;
