import BadMethodCallException from "../../Foundation/Exception/BadMethodCallException";
import type Application from "../../Foundation/Application";
import type { Class, ObjectOf } from "../../Types";
import useMagic from "../useMagic";

abstract class Facade {
  protected static facadeId: string | null = null;

  protected static app: Application;

  protected static resolvedInstance: ObjectOf<any> = {};

  public static setApplicationFacade(app: Application) {
    this.app = app;
  }

  public static getFacadeAccessor(): Class<any> | string {
    throw new Error("Facade does not implement getFacadeAccessor method.");
  }

  static __getStatic(name: string, abstract: string) {
    return (...args: any) => {
      const target = this.resolveFacadeInstance(abstract);
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
        `Method ${target.constructor.name}.${name} does not exist.`
      );
    };
  }

  protected static resolveFacadeInstance(abstract: string) {
    if (typeof this.getFacadeAccessor() == "string") {
      abstract = this.getFacadeAccessor() as string;
    }
    if (this.resolvedInstance[abstract]) {
      return this.resolvedInstance[abstract];
    }
    let target: any;
    if (typeof this.getFacadeAccessor() == "string") {
      target = this.app.make(this.getFacadeAccessor() as string);
    } else {
      if (!this.app.instances[abstract]) {
        this.app.singleton(abstract, this.getFacadeAccessor() as Class<any>);
      }
      target = this.app.make(abstract);
    }
    this.resolvedInstance[abstract] = target;
    return target;
  }
}
export class ExtendedFacade extends Facade {}

export default useMagic<typeof Facade>(Facade, ["__getStatic"]);
