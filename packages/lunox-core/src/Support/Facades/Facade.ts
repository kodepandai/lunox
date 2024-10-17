import BadMethodCallException from "../../Foundation/Exception/BadMethodCallException";
import type Application from "../../Foundation/Application";
import type { Class } from "../../Contracts";
import { useMagic } from "../magic";

abstract class Facade {
  protected static facadeId: string | null = null;

  protected static app: Application;

  protected static resolvedInstance: Record<string | symbol, any> = {};

  protected static cached = true;

  public static setApplicationFacade(app: Application) {
    this.app = app;
  }

  public static getFacadeAccessor(): Class<any> | string | symbol {
    throw new Error("Facade does not implement getFacadeAccessor method.");
  }

  static __getStatic(name: string, abstract: string | symbol) {
    // because this.app is still undefined here due to static method
    // so by using app(), we can rebind app here
    if (!this.app && app()) {
      this.setApplicationFacade(app());
    }
    const target = this.resolveFacadeInstance(abstract);
    // Tara... we can access target getter or property here
    if (Object.getOwnPropertyDescriptor(target, name)) {
      return target[name];
    }

    if (typeof target[name] != "function") {
      return target[name];
    }

    return (...args: any) => {
      // if target not resolved before, resolve here
      // this for checking Route facade is being called
      if (target.facadeCalled) {
        target.facadeCalled();
      }

      // check method is callable in instance
      if (target[name]) {
        return target[name].call(target, ...args);
      }

      // check method is callable in class
      if (target.constructor) {
        if (target.constructor[name]) {
          return target.constructor[name].call(target.constructor, ...args);
        }
      }

      throw new BadMethodCallException(
        `Method ${target.constructor.name}.${name} does not exist.`,
      );
    };
  }

  protected static resolveFacadeInstance(abstract: string | symbol) {
    if (this.resolvedInstance[abstract]) {
      return this.resolvedInstance[abstract];
    }
    let target: any;
    if (["string", "symbol"].includes(typeof this.getFacadeAccessor())) {
      abstract = this.getFacadeAccessor() as string | symbol;
      target = this.app.make(this.getFacadeAccessor() as string | symbol);
    } else {
      if (!(abstract in this.app.instances)) {
        this.app.singleton(abstract, this.getFacadeAccessor() as Class<any>);
      }
      target = this.app.make(abstract);
    }
    if (this.cached) {
      this.resolvedInstance[abstract] = target;
    }
    return target;
  }
}
export class ExtendedFacade extends Facade {}

export default useMagic<typeof Facade>(Facade, ["__getStatic"]);
