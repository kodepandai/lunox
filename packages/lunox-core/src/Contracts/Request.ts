import type { Request as ServerRequest } from "polka";
import type { Session } from "express-session";
import type { Request as RequestContract } from "../Http/Request";

export interface ExtendedRequest extends ServerRequest {
  session?: Session;
}
export type Request = RequestContract;

export interface FormRequest<Validator = any> extends Request {
  /**
   * Get rules for validator.
   */
  rules(): Record<string, any>;

  /**
   * Get custom messages for validator errors.
   */
  messages(): Record<string, any>;

  /**
   * Get custom attributes for validator errors.
   */
  attributes(): Record<string, any>;

  /**
   * Set validator instance.
   */
  setValidator(validator: Validator): this;

  /**
   * get validator instance
   */
  getValidator(): Validator;

  /**
   * Validate this form request.
   */
  validateForm(): Promise<any>;
}
