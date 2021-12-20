import AuthMiddleware from "../Middleware/AuthMiddleware";
import SessionMiddleware from "../Middleware/SessionMiddleware";
import CorsMiddleware from "../Middleware/CorsMiddleware";
import { Kernel as BaseKernel, StartSession } from "lunox";
class Kernel extends BaseKernel {
  protected middleware = [CorsMiddleware];

  protected middlewareGroups = {
    web: [StartSession],
  };

  protected routeMiddleware = {
    auth: AuthMiddleware,
    session: SessionMiddleware,
  };
}

export default Kernel;
