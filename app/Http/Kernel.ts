import AuthMiddleware from "../Middleware/AuthMiddleware";
import SessionMiddleware from "../Middleware/SessionMiddleware";
import CorsMiddleware from "../Middleware/CorsMiddleware";
import { Kernel as BaseKernel } from "lunox";
class Kernel extends BaseKernel {
  protected middleware = [CorsMiddleware];

  protected routeMiddleware = {
    auth: AuthMiddleware,
    session: SessionMiddleware,
  };
}

export default Kernel;
