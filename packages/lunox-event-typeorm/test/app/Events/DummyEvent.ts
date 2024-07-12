import { DispatchableEvent } from "@lunoxjs/event";

class DummyEvent extends DispatchableEvent {
  static key = Symbol("DummyEvent");
  constructor(public data: any) {
    super();
  }
}
export default DummyEvent;
