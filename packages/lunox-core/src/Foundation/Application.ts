import path from "path";
import { HttpException, NotFoundHttpException } from "../Http";
import Repository from "../Config/Repository";
import Container from "../Container/Container";
import type { Bootstrapper } from "../Contracts/Foundation/Bootstrapper";
import RoutingServiceProvider from "../Routing/RoutingServiceProvider";
import type ServiceProvider from "../Support/ServiceProvider";
import type { Class } from "../Types";
import type { ResponseRenderer } from "../Contracts/Response";

class Application extends Container {
  protected _basePath!: string;

  protected isBooted = false;

  public get config(): Repository {
    return this.make(Repository.symbol);
  }

  public responseRenderers: Class<ResponseRenderer>[] = [];

  protected isRunningInConsole: boolean | null = null;

  constructor(basePath: string | null = null) {
    super();
    /* exported app */
    global.app = <T extends string | null | any = null>(
      abstract: T | null = null,
      params = {},
    ) => {
      if (
        abstract &&
        (typeof abstract == "string" || typeof abstract == "symbol")
      ) {
        return this.make<T>(abstract, params);
      }
      return this as any;
    };
    this.setBasePath(basePath);
    this.registerBaseServiceProviders();
  }

  setBasePath(basePath: string | null) {
    this._basePath =
      basePath?.replace(new RegExp(`${path.sep}$`), "") || process.cwd();
    this.bindPaths();
    return this._basePath;
  }

  basePath(_path = "") {
    return path.join(this._basePath, _path);
  }
  configPath(_path = "") {
    return path.join(this._basePath, "config", _path);
  }
  storagePath(_path = "") {
    // storage folder is not included in dist
    return path.join(process.cwd(), "storage", _path);
  }
  publicPath(_path = "") {
    // public folder is not included in dist
    return path.join(process.cwd(), "public", _path);
  }

  bindPaths() {
    this.instance("path.basePath", this.basePath());
    this.instance("path.configPath", this.configPath());
  }

  async bootstrapWith(bootstrappers: Class<Bootstrapper>[]) {
    for (let index = 0; index < bootstrappers.length; index++) {
      await new bootstrappers[index]().bootstrap(this);
    }
  }

  async register(provider: ServiceProvider) {
    await provider.register();
  }

  async registerConfiguredProviders() {
    const providers =
      this.config.get<Class<ServiceProvider>[]>("app.providers") || [];
    for (let index = 0; index < providers.length; index++) {
      await this.register(new providers[index](this));
    }
  }

  async boot() {
    if (this.isBooted) {
      return;
    }
    const providers =
      this.config.get<Class<ServiceProvider>[]>("app.providers") || [];
    for (let index = 0; index < providers.length; index++) {
      await new providers[index](this).boot();
    }
    this.isBooted = true;
  }

  protected async registerBaseServiceProviders() {
    await this.register(new RoutingServiceProvider(this));
  }

  public abort(
    code: number,
    message = "",
    headers: Record<string, string> = {},
  ): never {
    if (code == 404) {
      throw new NotFoundHttpException(message);
    }
    throw new HttpException(code, message, null, headers);
  }

  public runningInConsole() {
    if (this.isRunningInConsole == null) {
      this.isRunningInConsole = env("APP_RUNNING_IN_CONSOLE");
    }
    return this.isRunningInConsole;
  }

  public runingUnitTests() {
    return this.config.get("app.env") == "testing";
  }
}

export default Application;
