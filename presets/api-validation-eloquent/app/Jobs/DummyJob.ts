import { Dispatchable } from "@lunoxjs/event";

class DummyJob extends Dispatchable {
  protected shouldQueue = true;
  protected metaUrl = import.meta.url;
  constructor(public message: string) {
    super();
  }
  async handle(): Promise<void> {
    console.log("Message from DummyJob:", this.message);
  }
}
export default DummyJob;
