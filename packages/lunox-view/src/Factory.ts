import View from "./View";
import type { Application } from "@lunoxjs/core";

class Factory<
  Data extends Record<string, any> = any,
  Context extends Record<string, any> = any,
> {
  public static symbol = Symbol("ViewFactory");
  constructor(protected app: Application) { }

  public make<D extends Data>(_path: string, data?: D) {
    return new View<D & Data, Context>(this.app).make(_path, data);
  }
}
export default Factory;
