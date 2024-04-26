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
  public flattenError(): Record<string, string> {
    return Object.fromEntries(
      Object.entries(this.validator.getErrors()).map(([key, val]) => [
        key,
        (val as any).message,
      ]),
    );
  }
}

export default ValidationException;
