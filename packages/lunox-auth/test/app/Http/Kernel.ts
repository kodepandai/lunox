import {
  AddQueuedCookiesToResponse,
  Kernel as BaseKernel,
  EncryptCookie,
} from "@lunoxjs/core";
import { StartSession } from "@lunoxjs/session";
class Kernel extends BaseKernel {
  protected middlewareGroups = {
    web: [EncryptCookie, AddQueuedCookiesToResponse, StartSession],
  };

  protected routeMiddleware = {};
}

export default Kernel;
