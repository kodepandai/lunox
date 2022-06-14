import type { Request } from "lunox/dist/Http/Request";
import { Controller } from "lunox";

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
    const { password, username } = await req.validate({
      username: "required",
      password: "required",
    });
    const authenticated = await req
      .auth()
      .attempt({ password, username }, Boolean(req.input("remember")));
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
