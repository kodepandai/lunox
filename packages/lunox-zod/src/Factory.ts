import type { Application } from "@lunoxjs/core";
import type { ZodRawShape } from "zod";
import Validator from "./Validator";

class Factory {
  public static symbol = Symbol("ZodValidatorFactory");

  protected app: Application;

  constructor(app: Application) {
    this.app = app;
  }
  public make<T extends ZodRawShape>(
    data: Record<string, any>,
    rules: T
    // messages: Record<string, string> = {},
    // customAttributes: Record<string, string> = {}
  ) {
    return new Validator(
      data,
      rules
      // messages, customAttributes
    );
  }
}
export default Factory;
