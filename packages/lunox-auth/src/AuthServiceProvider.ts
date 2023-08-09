import { ServiceProvider, Request } from "@lunoxjs/core";
import AuthManager, {
  AuthManager as AuthManagerContracts,
} from "./AuthManager";
import type { StatefulGuard } from "./contracts/StatefulGuard";
import SessionGuard from "./SessionGuard";

class AuthServiceProvider extends ServiceProvider {
  async register(): Promise<void> {
    this.app.singleton(AuthManager.symbol, () => new AuthManager(this.app));
    Request.macro("auth", function (this: Request) {
      if (this.managers["auth"]) {
        return this.managers["auth"] as AuthManagerContracts & StatefulGuard;
      }
      return (this.managers["auth"] = new AuthManager(this.app).setRequest(
        this,
      ));
    });
  }
  async boot(): Promise<void> {}
}

// augmentation Request interface for better typechecking
declare module "@lunoxjs/core" {
  interface Request {
    auth(): AuthManagerContracts & StatefulGuard;
  }
}

export default AuthServiceProvider;
