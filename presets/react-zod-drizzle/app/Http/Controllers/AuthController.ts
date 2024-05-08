import { Controller, Request } from "@lunoxjs/core";
import { z } from "zod";

class AuthController extends Controller {
  constructor() {
    super();
    this.middleware("guest").only(["showLogin", "postLogin"]);
  }

  async showLogin(req: Request) {
    if (await req.auth().check()) {
      return redirect("/");
    }
    return view("login", { version: app("version") });
  }
  async postLogin(req: Request) {
    const { password, username, remember } = await req.validate({
      username: z.string().min(1),
      password: z.string().min(1),
      remember: z.boolean().default(false),
    });
    const authenticated = await req
      .auth()
      .attempt({ password, username }, remember);
    if (!authenticated) {
      abort(401, "Credentials not found!");
    }
    return redirect("admin");
  }

  async logout(req: Request) {
    await req.auth().logout();
    return redirect("/");
  }
}

export default AuthController;
