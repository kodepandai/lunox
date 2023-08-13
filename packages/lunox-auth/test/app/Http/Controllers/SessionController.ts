import { Controller, Request } from "@lunoxjs/core";

class SessionController extends Controller {
  async attemptEloquent(req: Request) {
    const isAuthenticated = await req
      .auth()
      .guard("sessionEloquent")
      .attempt({
        password: req.get("password"),
        email: req.get("email"),
      });
    const user = await req.auth().guard("sessionEloquent").user();

    return response().json({ isAuthenticated, user });
  }
  async attemptTypeorm(req: Request) {
    const isAuthenticated = await req
      .auth()
      .guard("sessionTypeorm")
      .attempt({
        password: req.get("password"),
        email: req.get("email"),
      });
    const user = await req.auth().guard("sessionTypeorm").user();
    return response().json({ isAuthenticated, user });
  }
}
export default SessionController;
