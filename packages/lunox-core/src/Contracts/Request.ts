import type { Request as ServerRequest } from "polka";
import type { Session } from "express-session";
import type { Request as HttpRequest } from "../Http/Request";
export type Request = HttpRequest;

export interface ExtendedRequest extends ServerRequest {
  session?: Session;
}

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

export interface RequestCookies {
  [key: string]: any;
  set: (key: string, value: any) => void;
  get: (key: string) => any;
}
