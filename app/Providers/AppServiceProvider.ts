import { ServiceProvider } from "lunox";

class AppServiceProvider extends ServiceProvider {
  /**
   * Register any application services.
   */
  public async register() {
    this.app.instance("version", await this.getVersion());
  }

  /**
   * Bootstrap any application services
   */
  public async boot() {
    //
  }

  /**
   * Get app and framework version
   */
  private async getVersion() {
    const {
      version,
      dependencies: { lunox },
    } = await import("../../package.json");

    return {
      app: version,
      framework: lunox.replace("^", ""),
    };
  }
}

export default AppServiceProvider;
