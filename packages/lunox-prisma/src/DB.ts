import { Facade, useFacade } from "@lunoxjs/core";
import DatabaseManager from "./DatabaseManager";
import type { PrismaClientLinked } from "./contracts";

class DB extends Facade {
  static getFacadeAccessor() {
    return DatabaseManager.symbol;
  }
}
export default useFacade<
  InstanceType<typeof DatabaseManager> & PrismaClientLinked
>(DB);
