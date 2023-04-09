import ServiceProvider from "../Support/ServiceProvider";
import AuthManager from "./AuthManager";

class AuthServiceProvider extends ServiceProvider {
  async register(): Promise<void> {
    this.app.singleton(AuthManager.symbol, () => new AuthManager(this.app));
  }
}

export default AuthServiceProvider;
