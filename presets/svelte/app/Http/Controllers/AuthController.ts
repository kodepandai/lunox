import type { HttpRequest } from "lunox";
import { Controller } from "lunox";

class AuthController extends Controller {
  constructor() {
    super();
    this.middleware("guest").only(["showLogin", "postLogin"]);
  }

  async showLogin(req: HttpRequest) {
    if (await req.auth().check()) {
      return redirect("/");
    }
    return view("login", { version: app("version") });
  }
  async postLogin(req: HttpRequest) {
    const { password, user_name } = await req.validate({
      user_name: "required",
      password: "required",
    });
    const authenticated = await req
      .auth()
      .attempt({ password, user_name }, Boolean(req.input("remember")));
    if (!authenticated) {
      abort(401, "Credentials not found!");
    }
    return redirect("admin");
  }

  async logout(req: HttpRequest) {
    await req.auth().logout();
    return redirect("/");
  }
}

export default AuthController;
