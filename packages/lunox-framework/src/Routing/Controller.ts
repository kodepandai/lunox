import { Arr } from "../Support";
import type { Middleware, MiddlewareStack } from "../Contracts/Http/Middleware";
import { BadMethodCallException } from "../Foundation/Exception";
import ControllerMiddlewareOptions, {
  IOptions,
} from "./ControllerMiddlewareOptions";

abstract class Controller {
  protected middlewares: {
    middleware: string | Middleware;
    options: IOptions;
  }[] = [];

  /**
   * Execute an action on the controller.
   */
  public callAction(this: any, method: string, parameters: any[]) {
    // handle calls to missing methods
    if (!get_class_methods(this).includes(method)) {
      throw new BadMethodCallException(
        `Method ${this.constructor.name}.${method} does not exist.`
      );
    }

    return (this as any)[method](...parameters);
  }

  /**
   * Register middleware on the controller
   */
  public middleware(middleware: MiddlewareStack) {
    const options: IOptions = {
      except: [],
      only: [],
    };
    Arr.wrap(middleware).forEach((m) => {
      this.middlewares.push({
        middleware: m,
        options,
      });
    });
    return new ControllerMiddlewareOptions(options);
  }

  /**
   * Get the middleware assigned to the controller.
   */
  public getMiddleware() {
    return this.middlewares;
  }
}

export default Controller;
