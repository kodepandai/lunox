import { EventServiceProvider as ServiceProvider } from "../../../src";
import DummyEvent from "../Events/DummyEvent";
import DummyListener from "../Listeners/DummyListener";
class EventServiceProvider extends ServiceProvider {
  protected listen = {
    [DummyEvent.key]: [DummyListener],
  };
}
export default EventServiceProvider;
