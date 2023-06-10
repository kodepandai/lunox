import { Request, ServiceProvider } from "@lunoxjs/core";
import type { Request as RequestContract } from "@lunoxjs/core/contracts";
import SessionManager from "./SessionManager";

class SessionServiceProvider extends ServiceProvider {
  async register() {
    this.app.bind(SessionManager.symbol, () => request().session());
    Request.macro("session", function (this: RequestContract) {
      if (this.managers["session"]) {
        return this.managers["session"] as SessionManager;
      }
      return (this.managers["session"] = new SessionManager(
        this.app
      ).setRequest(this));
    });
  }

  async boot() {}
}

declare module "@lunoxjs/core/contracts" {
  interface Request {
    session(): SessionManager;
  }
}

export default SessionServiceProvider;
