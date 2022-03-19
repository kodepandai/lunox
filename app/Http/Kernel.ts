import CorsMiddleware from "../Middleware/CorsMiddleware";
import { Kernel as BaseKernel, StartSession} from "lunox";
import VerifyCsrfToken from "app/Middleware/VerifyCsrfToken";
import EncryptCookie from "app/Middleware/EncryptCookie";
class Kernel extends BaseKernel {
  protected middleware = [CorsMiddleware];

  protected middlewareGroups = {
    web: [
      EncryptCookie,
      StartSession,
      VerifyCsrfToken,
    ],
  };

  protected routeMiddleware = {
  };
}

export default Kernel;
