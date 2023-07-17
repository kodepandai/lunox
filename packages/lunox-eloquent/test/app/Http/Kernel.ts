import { Kernel as BaseKernel } from "@lunoxjs/core";
class Kernel extends BaseKernel {
  protected middlewareGroups = {};

  protected routeMiddleware = {};
}

export default Kernel;
