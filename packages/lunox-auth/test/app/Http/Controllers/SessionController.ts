import { Controller, Request } from "@lunoxjs/core";
import { StatefulGuard } from "../../../../src/contracts";

class SessionController extends Controller {
  async attemptEloquent(req: Request) {
    const isAuthenticated = await req
      .auth()
      .guard<StatefulGuard>("sessionEloquent")
      .attempt({
        password: req.get("password"),
        email: req.get("email"),
      });

    return response().json({ isAuthenticated });
  }
  async attemptTypeorm(req: Request) {
    const isAuthenticated = await req
      .auth()
      .guard<StatefulGuard>("sessionTypeorm")
      .attempt({
        password: req.get("password"),
        email: req.get("email"),
      });
    return response().json({ isAuthenticated });
  }
}
export default SessionController;
