import { Application, useMagic } from "@lunoxjs/core";
import { Class } from "@lunoxjs/core/contracts";
import { QueueConnection } from "./contracts/queue";
import TypeormConnection from "./queue/connections/TypeormConnection";
import Dispatchable from "./Dispatchable";

export class QueueManager {
  constructor(protected app: Application) { }
  static symbol = Symbol("QueueManager");
  static drivers: Record<string, any> = {
    typeorm: TypeormConnection,
  };
  protected static internalJobs: Record<string, Class<Dispatchable>> = {};
  static registerJob(key: string, job: Class<Dispatchable>) {
    this.internalJobs[key] = job;
  }
  getInternalJob(key: string) {
    return (this.constructor as typeof QueueManager).internalJobs[key];
  }
  defaultDriver(connection = this.defaultConnection()) {
    return this.app.config.get("queue.connections." + connection).driver;
  }
  defaultConnection() {
    return this.app.config.get("queue.defaultConnection");
  }
  driver(connection = this.defaultConnection()) {
    const driver = this.defaultDriver(connection);
    const driverConfig = this.app.config.get("queue.connections." + connection);
    return new QueueManager.drivers[driver](this.app, driverConfig);
  }

  public __get(method: keyof QueueConnection): any {
    const driver = this.driver();
    if (driver) {
      if (get_class_methods(driver).includes(method)) {
        return (...arg: any) => {
          return (driver[method] as any).call(driver, ...arg);
        };
      }
      if (Object.getOwnPropertyNames(driver).includes(method)) {
        return driver[method];
      }
    }
  }
}
export default useMagic<typeof QueueManager & Class<QueueConnection>>(
  QueueManager,
);
