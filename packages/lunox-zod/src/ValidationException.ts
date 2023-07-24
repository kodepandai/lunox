import type { ZodError } from "zod";
class ValidationException extends Error {
  protected zodError: ZodError;
  constructor(zodError: ZodError) {
    super(zodError.message, { cause: zodError });
    this.zodError = zodError;
  }
  public errors() {
    return this.flattenError(this.zodError.format());
  }
  getZodError() {
    return this.zodError;
  }
  private flattenError(
    zodError: Record<string, any>,
    stop = false,
  ): Record<string, any> {
    delete zodError._errors;
    if (stop) {
      return zodError;
    }
    const errors = Object.entries(zodError).filter(
      (e) => e[0] !== "_errors",
    ) as [string, Record<string, any>][];
    const mappedError = errors.map(([key, value]) => {
      if (Object.keys(value).filter((k) => k !== "_errors").length === 0) {
        return [key, value._errors];
      }
      return [key, this.flattenError(value)];
    });
    return Object.fromEntries(mappedError);
  }
}
export default ValidationException;
