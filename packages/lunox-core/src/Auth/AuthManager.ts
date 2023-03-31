import Str from "../Support/Str";
import type Repository from "../Config/Repository";
import type Application from "../Foundation/Application";
import type { Class, ObjectOf } from "../Types";
import EloquentUserProvider from "./EloquentUserProvider";
import SessionGuard from "./SessionGuard";
import type { StatefulGuard } from "../Contracts/Auth/StatefulGuard";
import type { UserProvider } from "../Contracts/Auth/UserProvider";
import useMagic from "../Support/useMagic";
import type { Request } from "../Http/Request";

type DriverCreator = (name: string, config: ObjectOf<any>) => StatefulGuard;

export class AuthManager {
  protected app: Application;

  protected guards: ObjectOf<StatefulGuard> = {};

  protected request!: Request;

  constructor(app: Application) {
    this.app = app;
  }

  public setRequest(request: Request) {
    this.request = request;
    return this;
  }

  public guard(name?: string) {
    name = name || this.getDefaultDriver();
    return this.guards[name] || (this.guards[name] = this.resolve(name));
  }

  public getDefaultDriver() {
    return this.config<string>("auth.defaults.guard");
  }

  protected resolve(name: string) {
    const config = this.getConfig(name);
    if (!config) {
      throw new Error(`"Auth guard [${name}] is not defined."`);
    }

    const driverMethod = `create${Str.ucfirst(
      config["driver"]
    )}Driver` as unknown as keyof AuthManager;
    if (typeof this[driverMethod] == "function") {
      return (this[driverMethod] as DriverCreator)(name, config);
    }
    throw new Error(
      `Auth driver [${config["driver"]}] for guard [${name}] is not defined.`
    );
  }

  protected getConfig(name: string) {
    return this.config<ObjectOf<any>>(`auth.guards.${name}`);
  }

  protected createSessionDriver(name: string, config: ObjectOf<any>) {
    const provider = this.createUserProvider(config["provider"]);
    const guard = new SessionGuard(
      name,
      provider,
      this.request.session(),
      this.request
    );
    if (config.remember) {
      guard.setRememberDuration(config.remember);
    }
    return guard;
  }

  public createUserProvider(provider: string): UserProvider {
    const config = this.getProviderConfiguration(provider);
    if (!config) {
      throw new Error("cannot get user provider config");
    }
    switch (config["driver"]) {
      case "database":
        // TODO: create databaseDriverProvider
        throw new Error(
          "sorry...database driver still in development, use eloquent driver instead"
        );
      case "eloquent":
        return this.createEloquentProvider(config);
      default:
        throw new Error(
          `Authentication user provider [${config["driver"]}] is not defined.`
        );
    }
  }

  protected getProviderConfiguration(provider?: string) {
    provider = provider || this.getDefaultUserProvider();
    if (provider) {
      return this.config<ObjectOf<any>>("auth.providers." + provider);
    }
  }

  protected config<T>(key: string): T {
    return this.app.make<Repository>("config").get<T>(key);
  }

  public getDefaultUserProvider() {
    return this.config<string>("auth.defaults.provider");
  }

  protected createEloquentProvider(config: ObjectOf<any>) {
    return new EloquentUserProvider(config["model"]);
  }

  public __get(method: keyof StatefulGuard): any {
    return (...arg: any) => {
      return (this.guard() as any)[method].call(this.guard(), ...arg);
    };
  }
}

export default useMagic<typeof AuthManager & Class<StatefulGuard>>(AuthManager);
