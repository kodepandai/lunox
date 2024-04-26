import { EventServiceProvider as BaseProvider } from "@lunoxjs/event";
import DummyEvent from "../Events/DummyEvent";
import DummyListener from "../Listeners/DummyListener";

class EventServiceProvider extends BaseProvider {
  protected listen = {
    [DummyEvent.key]: [DummyListener],
  };
}
export default EventServiceProvider;
