import CorsMiddleware from "app/Middleware/CorsMiddleware";
import {
  AddQueuedCookiesToResponse,
  Kernel as BaseKernel,
  StartSession,
} from "lunox";
import VerifyCsrfToken from "app/Middleware/VerifyCsrfToken";
import EncryptCookie from "app/Middleware/EncryptCookie";
import AuthMiddleware from "app/Middleware/AuthMiddleware";
import GuestMiddleware from "app/Middleware/GuestMiddleware";
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
