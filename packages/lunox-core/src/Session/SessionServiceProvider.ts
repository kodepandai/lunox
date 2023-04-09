import ServiceProvider from "../Support/ServiceProvider";
import SessionManager from "./SessionManager";

class SessionServiceProvider extends ServiceProvider {
  async register() {
    this.app.bind(SessionManager.symbol, () => request().session());
  }

  async boot() { }
}

export default SessionServiceProvider;
