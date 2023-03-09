import type { Bootstrapper } from "../../Contracts/Foundation/Boostrapper";
import type Application from "../Application";
import fs from "fs";
import Repository from "../../Config/Repository";
import path from "path";
import { pathToFileURL } from "url";

class LoadConfiguration implements Bootstrapper {
  async bootstrap(app: Application) {
    app.singleton("config", Repository);
    const Config = app.make<Repository>("config", { items: {} });
    global.config = (key, defaultValue) => Config.get(key, defaultValue);
    app.config = Config;
    await this.loadConfigurations(app, Config);
  }

  async getConfigurationFiles(app: Application) {
    const configPath = app.make("path.configPath");

    if (!fs.existsSync(configPath)) {
      fs.mkdirSync(configPath);
    }
    const files = (await walkDir(configPath)).map((x) =>
      x.replace(configPath + path.sep, "")
    );
    if (!(files.includes("app.js") || files.includes("app.ts"))) {
      throw new Error('unable to load "app": configuration file');
    }
    return files;
  }

  async loadConfigurations(app: Application, repository: Repository) {
    const configPath = app.make("path.configPath");

    const files = await this.getConfigurationFiles(app);
    await Promise.all(
      files.map(async (f) => {
        repository.set(
          f.replace(".js", "").replace(".ts", "").replace(path.sep, "."),
          (await import(pathToFileURL(path.join(configPath, f)).href))
            .default || {}
        );
      })
    );
  }
}

export default LoadConfiguration;
