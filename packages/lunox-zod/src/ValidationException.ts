import type { ZodError } from "zod";
class ValidationException extends Error {
  protected zodError: ZodError;
  constructor(zodError: ZodError) {
    super(zodError.message);
    this.zodError = zodError;
  }
  public errors() {
    return this.zodError.flatten().fieldErrors;
  }
}
export default ValidationException;
