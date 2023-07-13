import { Request, ServiceProvider } from "@lunoxjs/core";
import type { z, ZodObject, ZodRawShape } from "zod";
import Validator from "./facades/Validator";
import Factory from "./Factory";

class ValidationServiceProvider extends ServiceProvider {
  public async register() {
    this.app.singleton(Factory.symbol, () => new Factory(this.app));
  }

  public async boot() {
    // kita buat macro agar bisa menjalankan req.validate({...})
    Request.macro("validate", async function (this: Request, rules: ZodRawShape) {
      return await Validator.make(this.data, rules).validate();
    });
  }
}
// ini untuk inject type di req.validate()
declare module "@lunoxjs/core" {
  interface Request {
    validate<T extends ZodRawShape>(rules: T): Promise<z.infer<ZodObject<T>>>;
  }
}

export default ValidationServiceProvider;
