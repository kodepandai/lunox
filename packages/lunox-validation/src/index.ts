import ValidationException from "./ValidationException";
import ValidationServiceProvider from "./ValidationServiceProvider";
import type { Rule } from "./contracts/Validation";
import Validator from "./facades/Validator";
import FormRequest from "./FormRequest";
import type { Request } from "@lunoxjs/core";

export {
  ValidationException,
  ValidationServiceProvider,
  Rule,
  Validator,
  FormRequest,
};

declare module "@lunoxjs/core/contracts" {
  interface Request extends InstanceType<typeof Request> {
    validate(
      rules: Record<string, string>,
      messages?: Record<string, string>,
      customAttributes?: Record<string, string>
    ): Promise<any>;
  }
}
