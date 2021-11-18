import type Application from "../../Foundation/Application";
import type { Class } from "../../Types";

abstract class Facade {
  protected static facadeId: string | null = null;

  protected static app: Application;

  public static setApplicationFacade(app: Application) {
    this.app = app;
  }

  public static getFacadeAccessor(): Class<any> | string {
    throw new Error("Facade does not implement getFacadeAccessor method.");
  }

  static __getStatic(name: string, abstract: string) {
    return (...args: any) => {
      let target = this as any;
      if (typeof this.getFacadeAccessor() == "string") {
        target = this.app.make(this.getFacadeAccessor() as string);
      } else {
        if (!this.app.instances[abstract]) {
          this.app.singleton(abstract, this.getFacadeAccessor() as Class<any>);
        }
        target = this.app.make(abstract);
      }
      return target[name].call(target, ...args);
    };
  }
}

export default Facade;
