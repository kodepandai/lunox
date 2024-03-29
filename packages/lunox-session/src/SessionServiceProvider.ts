import {
  Handler,
  HttpException,
  Request,
  ServiceProvider,
} from "@lunoxjs/core";
import type { Session } from "express-session";
import SessionManager from "./SessionManager";
import TokenMismatchException from "./TokenMismatchException";

class SessionServiceProvider extends ServiceProvider {
  async register() {
    this.app.bind(SessionManager.symbol, () => request().session());
    Request.macro("session", function(this: Request) {
      if (this.managers["session"]) {
        return this.managers["session"] as SessionManager;
      }
      return (this.managers["session"] = new SessionManager(
        this.app
      ).setRequest(this));
    });

    Handler.addInternalDontReport(TokenMismatchException);
    Handler.addMapException({
      type: TokenMismatchException,
      value: (e: TokenMismatchException) => {
        return new HttpException(419, e.message, e);
      },
    });
  }

  async boot() { }
}

declare module "@lunoxjs/core" {
  interface Request {
    session(): SessionManager;
  }
}
declare module "@lunoxjs/core/contracts" {
  interface ServerRequest {
    session: Session;
  }
}

export default SessionServiceProvider;
