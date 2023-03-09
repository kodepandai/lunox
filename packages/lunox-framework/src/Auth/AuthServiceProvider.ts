import ServiceProvider from "../Support/ServiceProvider";
import AuthManager from "./AuthManager";
// import type {AuthManager} from "./AuthManager";

class AuthServiceProvider extends ServiceProvider {
  async register(): Promise<void> {
    this.app.singleton("auth", () => new AuthManager(this.app));
  }
}

export default AuthServiceProvider;
