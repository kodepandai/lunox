import { Listener } from "../../../src";
import DummyEvent from "../Events/DummyEvent";

class DummyListener extends Listener {
  protected shouldQueue = true;
  async handle(event: DummyEvent) {
    console.log(event);
  }
}
export default DummyListener;
