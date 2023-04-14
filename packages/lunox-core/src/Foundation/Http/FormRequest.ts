import Request from "../../Http/Request";

class FormRequest extends Request {
  /**
   * validator instance.
   */
  // TODO: move this to @lunoxjs/validation
  // protected validator: Validator | null = null;
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
   * TODO: move this to @lunoxjs/validation
   * Set validator instance.
   */
  // public setValidator(validator: Validator) {
  //   this.validator = validator;
  //   return this;
  // }

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
    return this.getValidatorInstance().validate();
  }

  /**
   * TODO: move this to @lunoxjs/validation
   * Create default validator instance
   */
  // protected createDefaultValidator(factory: Factory) {
  //   return factory.make(
  //     this.all(),
  //     this.rules(),
  //     this.messages(),
  //     this.attributes()
  //   );
  // }

  /**
   * TODO: move this to @lunoxjs/validation
   * Get validator instance for the request.
   */
  // protected getValidatorInstance() {
  //   if (this.validator) return this.validator;
  //   const factory = this.app.make<Factory>(Factory.symbol);
  //   const validator = this.createDefaultValidator(factory);
  //
  //   this.setValidator(validator);
  //   return this.validator as unknown as Validator;
  // }
}

export default FormRequest;
