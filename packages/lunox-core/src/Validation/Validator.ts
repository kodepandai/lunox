import { Validator as V } from "@kodepandai/node-input-validator";
import ValidationException from "../Validation/ValidationException";
import type { ObjectOf } from "../Types";

class Validator extends V {
  protected _inputs: ObjectOf<any>;
  constructor(
    data: ObjectOf<any>,
    rules: ObjectOf<any>,
    messages: ObjectOf<any>,
    customAttributes: ObjectOf<any> = {}
  ) {
    super(data, rules, messages);
    this.niceNames(customAttributes);
    this._inputs = Object.keys(rules).reduce((inputs, key) => {
      inputs[key] = data[key];
      return inputs;
    }, {} as ObjectOf<any>);
  }

  public async fails() {
    return !(await super.validate());
  }

  public async validate(inputs?: ObjectOf<any>): Promise<any> {
    const _inputs = inputs || this._inputs;
    if (await super.validate(inputs)) {
      // return only validated input
      return Object.keys(_inputs).reduce((prev, key) => {
        prev[key] = _inputs[key];
        return prev;
      }, {} as ObjectOf<any>);
    }
    throw new ValidationException(this);
  }
}

export default Validator;
