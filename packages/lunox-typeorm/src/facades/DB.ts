import { Facade, useFacade } from "@lunoxjs/core/facades";
import DatabaseManager from "../DatabaseManager";

class DB extends Facade {
  public static getFacadeAccessor() {
    return DatabaseManager.symbol;
  }
}

export default useFacade<InstanceType<typeof DatabaseManager>>(DB);
