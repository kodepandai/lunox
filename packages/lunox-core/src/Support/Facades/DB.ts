import Facade from "./Facade";
import type DatabaseManager from "../../Database/DatabaseManager";
import useFacade from "./useFacade";
class DB extends Facade {
  public static getFacadeAccessor() {
    return "db";
  }
}

export default useFacade<DatabaseManager>(DB);
