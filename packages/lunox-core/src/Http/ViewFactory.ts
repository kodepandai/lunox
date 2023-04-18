import type { ResponseRenderer } from "../Contracts/Response";
import type { Request } from "../Contracts/Request";
import type Response from "./Response";
import type Application from "../Foundation/Application";
import path from "path";

abstract class ViewFactory implements ResponseRenderer {
  protected app: Application;
  protected path!: string;
  protected data: Record<string, any> = {};
  protected ctx: Record<string, any> = {};
  constructor(app: Application) {
    this.app = app;
  }

  public make(_path: string, data: Record<string, any> = {}) {
    this.path = _path.split(".").join(path.sep);
    this.data = data;
    return this;
  }

  public withContext(ctx: Record<string, any>) {
    this.ctx = ctx;
    return this;
  }

  public async render(req: Request): Promise<Response> {
    throw new Error("Method not implemented.");
  }
}

export default ViewFactory;
