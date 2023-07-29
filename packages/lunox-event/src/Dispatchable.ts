import { Class } from "@lunoxjs/core/contracts";
import { DispatchableConfig } from "./contracts/job";
import Queue from "./facades/Queue";

abstract class Dispatchable {
  protected isListener = false;
  protected isInternal = false;
  isListenerJob() {
    return this.isListener;
  }
  isInternalJob() {
    return this.isInternal;
  }

  static hasListener = false;
  protected shouldQueue = false;
  protected static: any[] = [];
  abstract handle(...args: any[]): Promise<void>;
  static async dispatch<T extends Class<Dispatchable>>(
    this: T,
    ...args: [...params: ConstructorParameters<T>, config?: DispatchableConfig]
  ) {
    if ((this as unknown as typeof Dispatchable).hasListener) {
      let delayUntil = new Date();
      const lastArg = args.pop();
      if (
        typeof lastArg === "object" &&
        Object.keys(lastArg).includes("delay")
      ) {
        delayUntil = (lastArg as DispatchableConfig).delay as Date;
      } else {
        args.push(lastArg);
      }
      const event = new this(...args);
      await event.handle(event, config);
      return;
    }
    const lastArg = args.pop();
    let delayUntil = new Date();
    if (typeof lastArg === "object" && Object.keys(lastArg).includes("delay")) {
      delayUntil = (lastArg as DispatchableConfig).delay as Date;
    } else {
      args.push(lastArg);
    }
    const job = new this(...args);
    if (job.shouldQueue) {
      try {
        await Queue.add(job, args, delayUntil);
        // reset delay
        // (job.constructor as typeof Dispatchable).delayUntil = undefined;
      } catch (error) {
        console.log(error);
      }
      // register job to queue
    } else {
      // dispacth job immediately
      return await job.handle();
    }
  }
}

export default Dispatchable;
