import {
  EncryptCookie,
  VerifyCsrfToken,
  Kernel as BaseKernel,
  StartSession,
} from "../../../src";
class Kernel extends BaseKernel {
  protected middlewareGroups = {
    web: [EncryptCookie, StartSession, VerifyCsrfToken],
  };

  protected routeMiddleware = {};
}

export default Kernel;
