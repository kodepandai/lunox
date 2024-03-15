import { DispatchableEvent } from "@lunoxjs/event";

class DummyEvent extends DispatchableEvent {
  static key = Symbol("DummyEvent");
  constructor(public message: string) {
    super();
  }
}
export default DummyEvent;
