import { Controller, Request } from "@lunoxjs/core";
import { Response } from "@lunoxjs/core/facades";

class WelcomeController extends Controller {
  async home(req: Request) {
    return Response.make({
      version: app("version"),
      data: req.all(),
    });
  }
}

export default WelcomeController;
