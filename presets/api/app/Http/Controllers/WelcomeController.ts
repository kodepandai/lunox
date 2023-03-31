import { HttpRequest, Response } from "@lunoxjs/core";
import { Controller } from "@lunoxjs/core";

class WelcomeController extends Controller {
  async home(req: HttpRequest) {
    return Response.make({
      version: app("version"),
      data: req.all(),
      authenticated: await req.auth().check(),
    });
  }
}

export default WelcomeController;
