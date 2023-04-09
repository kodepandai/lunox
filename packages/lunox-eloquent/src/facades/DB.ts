import { Facade, useFacade } from "@lunoxjs/core";
import DatabaseManager from "../DatabaseManager";

class DB extends Facade {
  public static getFacadeAccessor() {
    return DatabaseManager.symbol;
  }
}

export default useFacade<DatabaseManager>(DB);
