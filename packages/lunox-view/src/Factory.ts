import View from "./View";
import type { Application } from "@lunoxjs/core";

class Factory {
  public static symbol = Symbol("ViewFactory");
  protected data: Record<string, any> = {};
  protected ctx: Record<string, any> = {};
  constructor(protected app: Application) { }

  public make(_path: string, data: Record<string, any> = {}) {
    return new View(this.app).make(_path, data);
  }
}
export default Factory;
