import type { Command } from "../Console";
import type Application from "../Foundation/Application";

abstract class ServiceProvider {
  protected app: Application;
  constructor(app: Application) {
    this.app = app;
  }

  async register() {}

  async boot() {}

  commands(commands: (typeof Command)[]) {
    this.app.instance("_commands", [
      ...(this.app.instances["_commands"] ?? []),
      ...commands,
    ]);
  }
}

export default ServiceProvider;
