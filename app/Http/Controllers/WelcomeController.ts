import type { Request } from "lunox/dist/Http/Request";
import { Controller } from "lunox";

class WelcomeController extends Controller {
  async home(req: Request) {
    const {
      version,
      dependencies: { lunox },
    } = await import("../../../package.json");
    const VERSION = {
      app: version,
      framework: lunox.replace("^", ""),
    };
    return view("home", {
      VERSION,
      data: req.all(),
    });
  }
}

export default WelcomeController;
