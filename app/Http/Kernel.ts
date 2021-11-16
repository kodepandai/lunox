import AuthMiddleware from "../Middleware/AuthMiddleware";
import BaseKernel from "../../vendor/laranode/Illuminate/Foundation/Http/Kernel";

class Kernel extends BaseKernel {
  protected routeMiddleware = {
    auth: AuthMiddleware,
  };
}

export default Kernel;
