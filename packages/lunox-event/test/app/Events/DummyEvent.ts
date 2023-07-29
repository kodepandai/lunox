import { DispatchableEvent } from "../../../src";

class DummyEvent extends DispatchableEvent {
  static key = Symbol("DummyEvent");
  constructor(public data: any) {
    super();
  }
}
export default DummyEvent;
