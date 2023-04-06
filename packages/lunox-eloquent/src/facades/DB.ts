import { Facade, useFacade } from "@lunoxjs/core";
import type DatabaseManager from "../DatabaseManager";

class DB extends Facade {
  public static getFacadeAccessor() {
    return "db";
  }
}

export default useFacade<DatabaseManager>(DB);
