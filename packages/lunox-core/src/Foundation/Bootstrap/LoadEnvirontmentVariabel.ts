import type { Bootstrapper } from "../../Contracts/Foundation/Bootstrapper";
import Env from "../../Support/Env";
import type Application from "../Application";

class LoadEnvirontmentVariabel implements Bootstrapper {
  async bootstrap(app: Application) {
    app.singleton(Env.symbol, Env);

    global.env = (key: string, defaultValue = null) =>
      app.make<Env>(Env.symbol).get(key, defaultValue);
  }
}

export default LoadEnvirontmentVariabel;
/** exported env */
