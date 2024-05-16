import type { Request, Response } from ".";
import type { ResponseRenderer } from "../Contracts/Response";
import type Application from "../Foundation/Application";

abstract class View<
  Data extends Record<string, any> = any,
  Context extends Record<string, any> = any,
> implements ResponseRenderer
{
  protected app: Application;
  protected path!: string;
  protected data: Data;
  protected ctx: Context;
  constructor(app: Application) {
    this.app = app;
    this.data = {} as Data;
    this.ctx = {} as Context;
  }

  public make<D extends Data>(_path: string, data?: D) {
    this.path = _path.split(".").join("/");
    if (data) this.data = data;
    return this as View<D & Data, Context>;
  }

  public withContext<C extends Context>(ctx: C) {
    this.ctx = ctx;
    return this as View<Data, C & Context>;
  }

  public async render(req?: Request): Promise<Response> {
    throw new Error("Method not implemented.");
  }
}

export default View;
