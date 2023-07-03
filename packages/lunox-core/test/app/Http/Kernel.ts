import { EncryptCookie, Kernel as BaseKernel } from "../../../src";
class Kernel extends BaseKernel {
  protected middlewareGroups = {
    web: [EncryptCookie],
  };

  protected routeMiddleware = {};
}

export default Kernel;
