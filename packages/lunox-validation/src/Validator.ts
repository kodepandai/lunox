import { Validator as V } from "@kodepandai/node-input-validator";
import ValidationException from "./ValidationException";

class Validator extends V {
  protected _inputs: Record<string, any>;
  constructor(
    data: Record<string, any>,
    rules: Record<string, any>,
    messages: Record<string, any>,
    customAttributes: Record<string, any> = {}
  ) {
    super(data, rules, messages);
    this.niceNames(customAttributes);
    this._inputs = Object.keys(rules).reduce((inputs, key) => {
      inputs[key] = data[key];
      return inputs;
    }, {} as Record<string, any>);
  }

  public async fails() {
    return !(await super.validate());
  }

  public async validate(inputs?: Record<string, any>): Promise<any> {
    const _inputs = inputs || this._inputs;
    if (await super.validate(inputs)) {
      // return only validated input
      return Object.keys(_inputs).reduce((prev, key) => {
        prev[key] = _inputs[key];
        return prev;
      }, {} as Record<string, any>);
    }
    throw new ValidationException(this);
  }
}

export default Validator;
