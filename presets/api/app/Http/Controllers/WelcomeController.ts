import { Controller } from "@lunoxjs/core";
import type { Request } from "@lunoxjs/core/contracts";
import { Response } from "@lunoxjs/core/facades";

class WelcomeController extends Controller {
  async home(req: Request) {
    return Response.make({
      version: app("version"),
      data: req.all(),
      authenticated: await req.auth().check(),
    });
  }
}

export default WelcomeController;
