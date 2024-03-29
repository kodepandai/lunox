import Factory from "./Factory";
import Mimes from "./rules/Mimes";
import { ServiceProvider, Request } from "@lunoxjs/core";
import Validator from "./facades/Validator";

class ValidationServiceProvider extends ServiceProvider {
  async register() {
    this.app.singleton(Factory.symbol, () => {
      return new Factory(this.app);
    });

    Request.macro(
      "validate",
      async function(
        this: Request,
        rules: Record<string, string>,
        messages: Record<string, string> = {},
        customAttributes: Record<string, string> = {}
      ) {
        return await Validator.make(
          this.data,
          rules,
          messages,
          customAttributes
        ).validate();
      }
    );
  }
  async boot() {
    Validator.extend(Mimes);
  }
}

declare module "@lunoxjs/core" {
  interface Request {
    validate(
      rules: Record<string, string>,
      messages?: Record<string, string>,
      customAttributes?: Record<string, string>
    ): Promise<any>;
  }
}

export default ValidationServiceProvider;
