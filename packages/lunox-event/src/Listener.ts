import Dispatchable from "./Dispatchable";
import DispatchableEvent from "./DispatchableEvent";

abstract class Listener extends Dispatchable {
  protected isListener = true;
  protected shouldQueue = false;
  protected path = base_path("app/Listeners")
  constructor(protected event: DispatchableEvent) {
    super();
  }
  public isShouldQueue() {
    return this.shouldQueue;
  }
}
export default Listener;
