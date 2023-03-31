import type Factory from "../../Validation/Factory";
import type { ObjectOf } from "../../Types";
import Request from "../../Http/Request";
import type Validator from "../../Validation/Validator";

class FormRequest extends Request {
  /**
   * validator instance.
   */
  protected validator: Validator | null = null;
  /**
   * Get rules for validator.
   */
  public rules(): ObjectOf<any> {
    return {};
  }

  /**
   * Get custom messages for validator errors.
   */
  public messages(): ObjectOf<any> {
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
  public attributes(): ObjectOf<any> {
    return {};
  }

  /**
   * Validate this form request.
   */
  public validateForm() {
    return this.getValidatorInstance().validate();
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
  protected getValidatorInstance() {
    if (this.validator) return this.validator;
    const factory = this.app.make<Factory>("validator");
    const validator = this.createDefaultValidator(factory);

    this.setValidator(validator);
    return this.validator as unknown as Validator;
  }
}

export default FormRequest;
