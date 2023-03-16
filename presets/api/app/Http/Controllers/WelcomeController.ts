import { HttpRequest, Response } from "lunox";
import { Controller } from "lunox";

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
