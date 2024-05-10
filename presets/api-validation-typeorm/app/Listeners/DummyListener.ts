import { Listener } from "@lunoxjs/event";
import DummyEvent from "../Events/DummyEvent";

class DummyListener extends Listener {
  protected shouldQueue = true;
  async handle(event: DummyEvent) {
    console.log("listener run", event.message);
  }
}
export default DummyListener;
