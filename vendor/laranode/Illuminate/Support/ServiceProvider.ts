import type Application from "../Foundation/Application";

abstract class ServiceProvider {
  protected app: Application;
  constructor(app: Application) {
    this.app = app;
  }

  async register() {}

  async boot() {}
}

export default ServiceProvider;
