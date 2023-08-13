import { Application, useMagic, Request } from "@lunoxjs/core";
import type { Class } from "@lunoxjs/core/contracts";
import type { GuardConfig, UserProviderConfig } from "./contracts/Config";
import type { Guard, StatefulGuard, UserProvider } from "./contracts";
import SessionGuard from "./SessionGuard";
import type { Model } from "@lunoxjs/eloquent";
import EloquentUserProvider from "./providers/eloquent/EloquentUserProvider";
import TypeormUserProvider from "./providers/typeorm/TypeormUserProvider";
import type { EntityTarget } from "typeorm";
import type { Authenticatable } from "./contracts/Authenticatable";

type GuardFactory = (name: string, config: GuardConfig) => Guard;
type UserProviderFactory = (config: UserProviderConfig) => UserProvider;

export class AuthManager {
  public static symbol = Symbol("AuthManager");
  protected static guardFactories: Record<string, GuardFactory> = {};
  protected static userProviderFactories: Record<string, UserProviderFactory> =
    {};

  protected app: Application;

  protected guards: Record<string, Guard> = {};

  protected request!: Request;

  constructor(app: Application) {
    this.app = app;
  }

  public static provider(name: string, providerFactory: UserProviderFactory) {
    this.userProviderFactories[name] = providerFactory;
  }

  public static extend(guardName: string, guardFactory: GuardFactory) {
    this.guardFactories[guardName] = guardFactory;
  }

  public setRequest(request: Request) {
    this.request = request;
    return this;
  }

  public getRequest() {
    return this.request;
  }

  public guard<T extends Guard = StatefulGuard>(name?: string): T {
    name = name || this.getDefaultDriver();
    return (this.guards[name] as T) || (this.guards[name] = this.resolve(name));
  }

  public getDefaultDriver() {
    return config<string>("auth.defaults.guard");
  }

  protected resolve<T extends Guard = StatefulGuard>(name: string): T {
    const config = this.getConfig(name);
    if (!config) {
      throw new Error(`"Auth guard [${name}] is not defined."`);
    }

    return (this.constructor as typeof AuthManager).createGuard(
      name,
      config,
    ) as T;
  }

  public static createGuard(name: string, config: GuardConfig) {
    // if driver for guard not registered, try register or throw if is not available
    if (!this.guardFactories[config.driver]) {
      switch (config.driver) {
        case "session":
          this.registerSessionGuard();
          break;
        default:
          break;
      }
    }
    const guardFactory = this.guardFactories[config.driver];
    if (!guardFactory) {
      throw new Error(
        `Authentication driver [${config.driver}] for guard [${name}] is not defined.`,
      );
    }
    return guardFactory(name, config);
  }

  public static createUserProvider(provider: string): UserProvider {
    const config = this.getProviderConfiguration(provider);
    if (!config) {
      throw new Error("cannot get user provider config");
    }

    const driver = config["driver"];
    // if driver for userprovider not registered, try register or throw if is not available
    if (!this.userProviderFactories[driver]) {
      switch (driver) {
        case "eloquent":
          this.registerEloquentProvider();
          break;
        case "typeorm":
          this.registerTypeormProvider();
          break;
        default:
          break;
      }
    }
    const userProviderCreator = this.userProviderFactories[driver];
    if (!userProviderCreator) {
      throw new Error(
        `Authentication user provider [${config["driver"]}] is not defined.`,
      );
    }
    return userProviderCreator(config);
  }

  private static registerSessionGuard() {
    AuthManager.extend("session", (name, config) => {
      const provider = AuthManager.createUserProvider(config["provider"]);
      const guard = new SessionGuard(name, provider, request());
      if (config.remember) {
        guard.setRememberDuration(config.remember);
      }
      return guard;
    });
  }

  private static registerEloquentProvider() {
    AuthManager.provider("eloquent", (config) => {
      return new EloquentUserProvider(
        config.authenticatable as unknown as Model,
      );
    });
  }

  private static registerTypeormProvider() {
    AuthManager.provider("typeorm", (config) => {
      return new TypeormUserProvider(
        config.authenticatable as unknown as EntityTarget<any> &
        Class<Authenticatable>,
      );
    });
  }

  protected getConfig(name: string) {
    return config<GuardConfig>(`auth.guards.${name}`);
  }

  protected static getProviderConfiguration(provider?: string) {
    provider = provider || this.getDefaultUserProvider();
    if (provider) {
      return config<UserProviderConfig>("auth.providers." + provider);
    }
  }

  public static getDefaultUserProvider() {
    return config<string>("auth.defaults.provider");
  }

  public __get(method: keyof Guard): any {
    return (...arg: any[]) => {
      return (this.guard() as any)[method].call(this.guard(), ...arg);
    };
  }
}

export default useMagic<typeof AuthManager & Class<StatefulGuard>>(AuthManager);
