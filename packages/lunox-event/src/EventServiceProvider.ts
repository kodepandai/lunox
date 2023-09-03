import { ServiceProvider } from "@lunoxjs/core";
import QueueWork from "./commands/QueueWork";
import RunJobCommand from "./commands/RunJobCommand";
import RunScheduleCommand from "./commands/RunScheduleCommand";
import { QueueConfig } from "./contracts/queue";
import QueueManager from "./QueueManager";
import { EventListeners } from "./contracts/console";
import EventManager from "./EventManager";
import { QueueJobFailedModel, QueueJobModel } from "./symbols";
import { DatabaseManager } from "@lunoxjs/typeorm";
import { DatabaseConfig } from "@lunoxjs/typeorm/contracts";
import { QueueJob, QueueJobFailed } from "./contracts/model";

class EventServiceProvider extends ServiceProvider {
  protected listen: EventListeners = {};
  async register() {
    await this.setupQueue();
    this.registerFacades();
    this.registerCommands();
  }

  private async setupQueue() {
    const config = this.app.config.get<QueueConfig>("queue");
    //if connection is typeorm, inject TypeOrm Models
    if (config.connections[config.defaultConnection].driver == "typeorm") {
      const models = await this.typeormModels();
      await this.bindTypeOrmModel();
      const typeormConfig = this.app.config.get<DatabaseConfig>(
        `${DatabaseManager.configFile}`,
      );
      const connections = typeormConfig.connections;
      for (const key in connections) {
        // this will make sure that entities is injected to correct driver
        this.app.config.set(
          `${DatabaseManager.configFile}.connections.${key}.entities`,
          [
            ...((typeormConfig.connections[key].entities as any[]) || []),
            models.queueJob[typeormConfig.connections[key].type],
            models.queueJobFailed[typeormConfig.connections[key].type],
          ],
        );
      }
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
  private async bindTypeOrmModel() {
    const models = await this.typeormModels();
    // bind Model for specific typeorm database driver
    this.app.bind(QueueJobModel, () => {
      const typeormConfig = this.app.config.get<DatabaseConfig>(
        DatabaseManager.configFile,
      );
      const typeormDriver =
        typeormConfig.connections[typeormConfig.defaultConnection].type;
      return models.queueJob[typeormDriver];
    });
    this.app.bind(QueueJobFailedModel, () => {
      const typeormConfig = this.app.config.get<DatabaseConfig>(
        DatabaseManager.configFile,
      );
      const typeormDriver =
        typeormConfig.connections[typeormConfig.defaultConnection].type;
      return models.queueJobFailed[typeormDriver];
    });
  }
  private async typeormModels() {
    return {
      queueJob: {
        mysql: (await import("./models/typeorm/QueueJobMysql")).default,
        sqlite: (await import("./models/typeorm/QueueJobSqlite")).default,
        postgres: (await import("./models/typeorm/QueueJobPg")).default,
      } as Record<string, QueueJob>,
      queueJobFailed: {
        mysql: (await import("./models/typeorm/QueueJobFailedMysql")).default,
        sqlite: (await import("./models/typeorm/QueueJobFailedSqlite")).default,
        postgres: (await import("./models/typeorm/QueueJobFailedPg")).default,
      } as Record<string, QueueJobFailed>,
    };
  }
}
export default EventServiceProvider;
