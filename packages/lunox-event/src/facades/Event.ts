import { Facade, useFacade } from "@lunoxjs/core";
import EventManager from "../EventManager";

class Event extends Facade {
  static getFacadeAccessor() {
    return EventManager.symbol;
  }
}
export default useFacade<EventManager>(Event);
