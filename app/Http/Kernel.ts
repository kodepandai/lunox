import AuthMiddleware from "../Middleware/AuthMiddleware";
import BaseKernel from "../../vendor/laranode/Illuminate/Foundation/Http/Kernel";
import SessionMiddleware from "../Middleware/SessionMiddleware";
import CorsMiddleware from "../Middleware/CorsMiddleware";

class Kernel extends BaseKernel {
  protected middleware = [CorsMiddleware];

  protected routeMiddleware = {
    auth: AuthMiddleware,
    session: SessionMiddleware,
  };
}

export default Kernel;
