import { Class } from "@lunoxjs/core/contracts";
import { DispatchableConfig, Resolvable } from "./contracts/job";
import Queue from "./facades/Queue";

abstract class Dispatchable implements Resolvable {
  public tries?: number;
  public async failed(e: Error) {
    // pass
  }
  protected isListener = false;
  isListenerJob() {
    return this.isListener;
  }
  protected abstract metaUrl: string;
  static hasListener = false;
  protected shouldQueue = false;
  protected static: any[] = [];
  abstract handle(...args: any[]): Promise<void>;
  static async dispatch<T extends Class<Dispatchable>>(
    this: T,
    ...args: [...params: ConstructorParameters<T>, config?: DispatchableConfig]
  ) {
    let delay;
    let connection;
    const lastArg = args.pop();
    if (isValidConfig(lastArg)) {
      delay = (lastArg as DispatchableConfig).delay;
      connection = (lastArg as DispatchableConfig).connection;
    } else {
      args.push(lastArg);
    }
    if ((this as unknown as typeof Dispatchable).hasListener) {
      const event = new this(...args);
      await event.handle(event, {
        delay,
        connection,
      } satisfies DispatchableConfig);
      return;
    }
    const job = new this(...args);
    if (job.shouldQueue) {
      // register job to queue
      try {
        await Queue.add(job, args, { delay, connection });
      } catch (error) {
        console.log(error);
      }
    } else {
      // dispacth job immediately
      return await job.handle();
    }
  }
  public displayName(): string {
    return get_current_filename(this.metaUrl);
  }
}
function isValidConfig(lastArg: any) {
  return (
    typeof lastArg === "object" &&
    (Object.keys(lastArg).includes("delay") ||
      Object.keys(lastArg).includes("connection"))
  );
}

export default Dispatchable;
