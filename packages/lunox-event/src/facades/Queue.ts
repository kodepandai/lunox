import { Facade, useFacade } from "@lunoxjs/core";
import QueueManager from "../QueueManager";

class Queue extends Facade {
  static getFacadeAccessor() {
    return QueueManager.symbol;
  }
}
export default useFacade<InstanceType<typeof QueueManager>>(Queue);
