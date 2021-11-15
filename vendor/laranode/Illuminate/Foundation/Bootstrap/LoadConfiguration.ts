import type { Bootstrapper } from "../../Contracts/Foundation/Boostrapper";
import type Application from "../Application";
import fs from "fs";
import Repository from "../../Config/Repository";
import path from "path";

class LoadConfiguration implements Bootstrapper {
  async bootstrap(app: Application) {
    app.singleton("config", Repository);
    const Config = app.make<Repository>("config", { items: {} });
    global.config = (key, defaultValue) => Config.get(key, defaultValue);
    await this.loadConfigurations(app, Config);
  }

  getConfigurationFiles(app: Application) {
    const configPath = app.make("path.configPath");

    if (!fs.existsSync(configPath)) {
      fs.mkdirSync(configPath);
    }
    const files = fs.readdirSync(configPath);
    if (!files.includes("app.js")) {
      throw new Error('unable to load "app": configuration file');
    }
    return files;
  }

  async loadConfigurations(app: Application, repository: Repository) {
    const configPath = app.make("path.configPath");

    const files = this.getConfigurationFiles(app);
    await Promise.all(
      files.map(async (f) => {
        repository.set(
          f.replace(".js", ""),
          (await import(path.join(configPath, f))).default || {}
        );
      })
    );
  }
}

export default LoadConfiguration;
