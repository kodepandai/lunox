import Str from "../Support/Str";
import type Repository from "../Config/Repository";
import type Application from "../Foundation/Application";
import type { Class } from "../Types";
import SessionGuard from "./SessionGuard";
import type { StatefulGuard } from "../Contracts/Auth/StatefulGuard";
import type { UserProvider } from "../Contracts/Auth/UserProvider";
import useMagic from "../Support/useMagic";
import type { Request } from "../Http/Request";

type DriverCreator = (
  name: string,
  config: Record<string, any>
) => StatefulGuard;
type UserProviderCreator = (config: Record<string, any>) => UserProvider;

export class AuthManager {
  protected app: Application;

  protected guards: Record<string, StatefulGuard> = {};

  protected request!: Request;

  protected static userProviders: Record<string, UserProviderCreator> = {};

  constructor(app: Application) {
    this.app = app;
  }

  public setRequest(request: Request) {
    this.request = request;
    return this;
  }

  public guard(name?: string): StatefulGuard {
    name = name || this.getDefaultDriver();
    return this.guards[name] || (this.guards[name] = this.resolve(name));
  }

  public getDefaultDriver() {
    return this.config<string>("auth.defaults.guard");
  }

  public static registerUserProvider(
    name: string,
    providerCreator: UserProviderCreator
  ) {
    this.userProviders[name] = providerCreator;
  }

  protected resolve(name: string): StatefulGuard {
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
    return this.config<Record<string, any>>(`auth.guards.${name}`);
  }

  protected createSessionDriver(name: string, config: Record<string, any>) {
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

    const driver = config["driver"];
    // get driver from registered userProviders
    if (driver in (this.constructor as typeof AuthManager).userProviders) {
      return (this.constructor as typeof AuthManager).userProviders[driver](
        config
      );
    }

    // if driver is not registered, throw an error
    throw new Error(
      `Authentication user provider [${config["driver"]}] is not defined.`
    );
  }

  protected getProviderConfiguration(provider?: string) {
    provider = provider || this.getDefaultUserProvider();
    if (provider) {
      return this.config<Record<string, any>>("auth.providers." + provider);
    }
  }

  protected config<T>(key: string): T {
    return this.app.make<Repository>("config").get<T>(key);
  }

  public getDefaultUserProvider() {
    return this.config<string>("auth.defaults.provider");
  }

  public __get(method: keyof StatefulGuard): any {
    return (...arg: any) => {
      return (this.guard() as any)[method].call(this.guard(), ...arg);
    };
  }
}

export default useMagic<typeof AuthManager & Class<StatefulGuard>>(AuthManager);
