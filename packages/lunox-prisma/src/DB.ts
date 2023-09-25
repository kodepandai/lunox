import { Facade, useFacade } from "@lunoxjs/core";
import DatabaseManager from "./DatabaseManager";
import type ClientWrapper from "./ClientWrapper";

class DB extends Facade {
  static getFacadeAccessor() {
    return DatabaseManager.symbol;
  }
}
export default useFacade<
  InstanceType<typeof DatabaseManager> & ClientWrapper["client"]
>(DB);
