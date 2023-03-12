import type { HttpRequest } from "lunox";
import { Controller } from "lunox";

class WelcomeController extends Controller {
  async home(req: HttpRequest) {
    return view("home", {
      version: app("version"),
      data: req.all(),
      authenticated: await req.auth().check(),
    });
  }
}

export default WelcomeController;
