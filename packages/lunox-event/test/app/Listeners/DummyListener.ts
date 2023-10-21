import { Listener } from "../../../src";
import DummyEvent from "../Events/DummyEvent";

class DummyListener extends Listener {
  protected shouldQueue = true;
  async handle(event: DummyEvent) {
    if (event.data.fail) {
      throw new Error("Failed by accident");
    }
    console.log(event);
  }
}
export default DummyListener;
