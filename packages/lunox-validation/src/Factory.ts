import Validator from "./Validator";
import { Messages, extend } from "@kodepandai/node-input-validator";
import type { Rule } from "./contracts/Validation";
import type { Application } from "@lunoxjs/core";

class Factory {
  public static symbol = Symbol("ValidatorFactory");
  protected app: Application;

  constructor(app: Application) {
    this.app = app;
  }
  public make(
    data: Record<string, any>,
    rules: Record<string, string>,
    messages: Record<string, string> = {},
    customAttributes: Record<string, string> = {}
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
