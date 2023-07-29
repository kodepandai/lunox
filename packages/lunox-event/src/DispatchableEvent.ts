import { RuntimeException } from "@lunoxjs/core";
import Dispatchable from "./Dispatchable";
import Event from "./facades/Event";
import Queue from "./facades/Queue";

class DispatchableEvent extends Dispatchable {
  static hasListener = true;
  static key: symbol | string;
  async handle(event: DispatchableEvent): Promise<void> {
    const key = (this.constructor as typeof DispatchableEvent).key;
    if (!key) {
      throw new RuntimeException(
        this.constructor.name + ".key is not defined. Event should has unique key to be dispatched."
      );
    }
    const listeners = Event.getListener(key);
    for (const listener of listeners) {
      const listenerInstance = new listener(event);
      if (listenerInstance.isShouldQueue()) {
        await Queue.add(listenerInstance, [event]);
      } else {
        await listenerInstance.handle(event);
      }
    }
  }
}
export default DispatchableEvent;
