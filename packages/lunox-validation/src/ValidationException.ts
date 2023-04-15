import type Validator from "./Validator";

class ValidationException extends Error {
  public status = 422;
  protected validator: Validator;
  constructor(validator: Validator) {
    super("The given data was invalid.");
    this.validator = validator;
  }

  public errors() {
    return this.validator.getErrors();
  }
}

export default ValidationException;
