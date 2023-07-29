import { ServiceProvider } from "@lunoxjs/core";
import QueueWork from "./commands/QueueWork";
import RunJobCommand from "./commands/RunJobCommand";
import RunScheduleCommand from "./commands/RunScheduleCommand";
import { QueueConfig } from "./contracts/queue";
import QueueManager from "./QueueManager";
import { EventListeners } from "./contracts/console";
import EventManager from "./EventManager";

class EventServiceProvider extends ServiceProvider {
  protected listen: EventListeners = {};
  async register() {
    await this.setupQueue();
    this.registerFacades();
    this.registerCommands();
  }

  private async setupQueue() {
    const config = this.app.config.get<QueueConfig>("queue");

    //if connection is typeorm, inject Model QueueJob
    if (config.connections[config.defaultConnection].driver == "typeorm") {
      this.app.config.set("database.entities", [
        ...this.app.config.get("database.entities"),
        (await import("./models/QueueJob")).default,
        (await import("./models/QueueJobFailed")).default,
      ]);
    }
  }
  private registerCommands() {
    this.commands([RunScheduleCommand, RunJobCommand, QueueWork]);
  }

  private registerFacades() {
    this.app.singleton(QueueManager.symbol, () => new QueueManager(this.app));
    this.app.singleton(
      EventManager.symbol,
      () => new EventManager(this.app, this.listen),
    );
  }
}
export default EventServiceProvider;
