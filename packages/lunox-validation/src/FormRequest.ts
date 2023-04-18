import { Request } from "@lunoxjs/core";
import type { FormRequest as FormRequestContract } from "@lunoxjs/core/contracts";
import Factory from "./Factory";
import type Validator from "./Validator";

interface FormRequest {
  validate(
    rules: Record<string, string>,
    messages?: Record<string, string>,
    customAttributes?: Record<string, string>
  ): Promise<any>;
}

class FormRequest extends Request implements FormRequestContract<Validator> {
  /**
   * validator instance.
   */
  protected validator: Validator | null = null;
  /**
   * Get rules for validator.
   */
  public rules(): Record<string, any> {
    return {};
  }

  /**
   * Get custom messages for validator errors.
   */
  public messages(): Record<string, any> {
    return {};
  }

  /**
   * Set validator instance.
   */
  public setValidator(validator: Validator) {
    this.validator = validator;
    return this;
  }

  /**
   * Get custom attributes for validator errors.
   */
  public attributes(): Record<string, any> {
    return {};
  }

  /**
   * Validate this form request.
   */
  public validateForm() {
    return this.getValidator().validate();
  }

  /**
   * Create default validator instance
   */
  protected createDefaultValidator(factory: Factory) {
    return factory.make(
      this.all(),
      this.rules(),
      this.messages(),
      this.attributes()
    );
  }

  /**
   * Get validator instance for the request.
   */
  public getValidator() {
    if (this.validator) return this.validator;
    const factory = this.app.make<Factory>(Factory.symbol);
    return (this.validator = this.createDefaultValidator(factory));
  }
}

export default FormRequest;
