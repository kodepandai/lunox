import CorsMiddleware from "../Middleware/CorsMiddleware";
import {
  AddQueuedCookiesToResponse,
  Kernel as BaseKernel,
  StartSession,
} from "lunox";
import VerifyCsrfToken from "../Middleware/VerifyCsrfToken";
import EncryptCookie from "../Middleware/EncryptCookie";
import AuthMiddleware from "../Middleware/AuthMiddleware";
import GuestMiddleware from "../Middleware/GuestMiddleware";
class Kernel extends BaseKernel {
  protected middleware = [CorsMiddleware];

  protected middlewareGroups = {
    web: [
      EncryptCookie,
      AddQueuedCookiesToResponse,
      StartSession,
      VerifyCsrfToken,
    ],
  };

  protected routeMiddleware = {
    auth: AuthMiddleware,
    guest: GuestMiddleware,
  };
}

export default Kernel;
