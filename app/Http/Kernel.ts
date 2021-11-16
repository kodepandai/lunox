import AuthMiddleware from "../Middleware/AuthMiddleware";
import BaseKernel from "../../vendor/laranode/Illuminate/Foundation/Http/Kernel";
import SessionMiddleware from "../Middleware/SessionMiddleware";

class Kernel extends BaseKernel {
  protected routeMiddleware = {
    auth: AuthMiddleware,
    session: SessionMiddleware,
  };
}

export default Kernel;
