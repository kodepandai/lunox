import type { Bootstrapper } from "../../Contracts/Foundation/Boostrapper";
import Env from "../../Support/Env";
import type Application from "../Application";

class LoadEnvirontmentVariabel implements Bootstrapper {
  async bootstrap(app: Application) {
    app.singleton("Env", Env);

    global.env = (key, defaultValue = null) =>
      app.make<Env>("Env").get(key, defaultValue);
  }
}

export default LoadEnvirontmentVariabel;
/** exported env */
