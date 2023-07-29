import { Application } from "@lunoxjs/core";
import { EventListeners } from "./contracts/console";

class EventManager {
  static symbol = Symbol("EventManager");
  constructor(protected app: Application, protected listeners: EventListeners = {}) {}
  getListener(event: symbol | string) {
    return this.listeners[event] || [];
  }
}
export default EventManager;
