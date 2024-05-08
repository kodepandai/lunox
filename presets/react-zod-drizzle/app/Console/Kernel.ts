import { Kernel as ConsoleKernel } from "@lunoxjs/core/console";

class Kernel extends ConsoleKernel {
  protected async commands() {
    await this.load(base_path("app/Console/Command"));
  }
}

export default Kernel;
