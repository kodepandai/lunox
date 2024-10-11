import type { Bootstrapper } from "../../Contracts/Foundation/Bootstrapper";
import type Application from "../Application";
import fs from "fs";
import Repository from "../../Config/Repository";
import path from "path";
import { pathToFileURL } from "url";

class LoadConfiguration implements Bootstrapper {
  async bootstrap(app: Application) {
    app.singleton(Repository.symbol, Repository);
    const Config = app.make<Repository>(Repository.symbol, { items: {} });
    global.config = (key, defaultValue) => Config.get(key, defaultValue);
    await this.loadConfigurations(app, Config);
  }

  async getConfigurationFiles(app: Application) {
    const configPath = app.make("path.configPath");

    if (!fs.existsSync(configPath)) {
      fs.mkdirSync(configPath);
    }
    const files = (await walkDir(configPath)).map((x) =>
      x.replace(configPath + path.sep, ""),
    );
    if (!files.includes("app" + app.getExt())) {
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
          f.replace(app.getExt(), "").replace(path.sep, "."),
          (await import(pathToFileURL(path.join(configPath, f)).href))
            .default || {},
        );
      }),
    );
  }
}

export default LoadConfiguration;
