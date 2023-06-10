import { Application, useMagic } from "@lunoxjs/core";
import type { Class, Request } from "@lunoxjs/core/contracts";
import type { GuardConfig, UserProviderConfig } from "./contracts/Config";
import type { Guard, StatefulGuard, UserProvider } from "./contracts";

type DriverCreator = (name: string, config: GuardConfig) => Guard;
type UserProviderCreator = (config: UserProviderConfig) => UserProvider;

export class AuthManager {
  public static symbol = Symbol("AuthManager");
  protected static drivers: Record<string, DriverCreator> = {};
  protected static userProviders: Record<string, UserProviderCreator> = {};

  protected app: Application;

  protected guards: Record<string, Guard> = {};

  protected request!: Request;

  constructor(app: Application) {
    this.app = app;
  }

  public static registerUserProvider(
    name: string,
    providerCreator: UserProviderCreator
  ) {
    this.userProviders[name] = providerCreator;
  }

  public static registerDriver(name: string, driverCreator: DriverCreator) {
    this.drivers[name] = driverCreator;
  }

  public setRequest(request: Request) {
    this.request = request;
    return this;
  }

  public getRequest() {
    return this.request;
  }

  public guard(name?: string): Guard {
    name = name || this.getDefaultDriver();
    return this.guards[name] || (this.guards[name] = this.resolve(name));
  }

  public getDefaultDriver() {
    return config<string>("auth.defaults.guard");
  }

  protected resolve(name: string): Guard {
    const config = this.getConfig(name);
    if (!config) {
      throw new Error(`"Auth guard [${name}] is not defined."`);
    }

    return (this.constructor as typeof AuthManager).createDriver(name, config);
  }

  public static createDriver(name: string, config: GuardConfig) {
    const driverCreator = this.drivers[config.driver];
    if (!driverCreator) {
      throw new Error(
        `Authentication driver [${config.driver}] for guard [${name}] is not defined.`
      );
    }
    return driverCreator(name, config);
  }

  public static createUserProvider(provider: string): UserProvider {
    const config = this.getProviderConfiguration(provider);
    if (!config) {
      throw new Error("cannot get user provider config");
    }

    const driver = config["driver"];
    const userProviderCreator = this.userProviders[driver];
    if (!userProviderCreator) {
      throw new Error(
        `Authentication user provider [${config["driver"]}] is not defined.`
      );
    }
    return userProviderCreator(config);
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

  public __get(method: keyof StatefulGuard): any {
    return (...arg: any) => {
      return (this.guard() as any)[method].call(this.guard(), ...arg);
    };
  }
}

export default useMagic<typeof AuthManager & Class<StatefulGuard>>(AuthManager);
