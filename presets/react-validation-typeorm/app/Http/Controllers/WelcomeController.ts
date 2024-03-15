import { Controller, Request } from "@lunoxjs/core";

class WelcomeController extends Controller {
  async home(req: Request) {
    return view("home", {
      version: app("version"),
      data: req.all(),
      authenticated: await req.auth().check(),
    });
  }
}

export default WelcomeController;
