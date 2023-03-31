import CorsMiddleware from "../Middleware/CorsMiddleware";
import { Kernel as BaseKernel } from "@lunoxjs/core";
import AuthMiddleware from "../Middleware/AuthMiddleware";
import GuestMiddleware from "../Middleware/GuestMiddleware";
class Kernel extends BaseKernel {
  protected middleware = [CorsMiddleware];

  protected middlewareGroups = {};

  protected routeMiddleware = {
    auth: AuthMiddleware,
    guest: GuestMiddleware,
  };
}

export default Kernel;
