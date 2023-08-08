import { Application, useMagic } from "@lunoxjs/core";
import type { Class } from "@lunoxjs/core/contracts";
import {
  DataSource,
  DataSourceOptions,
  EntityTarget,
  ObjectLiteral,
} from "typeorm";
import type { DatabaseConfig } from "./contracts";

export class DatabaseManager {
  public static symbol = Symbol("TypeORMDatabaseManager");
  public static configFile = "database";
  protected app: Application;
  protected config: DatabaseConfig["connections"] = {};
  protected db!: DataSource;

  constructor(app: Application) {
    this.app = app;
  }

  /**
   * Get DataSourceOptions via database connection config
   */
  protected configuration(name?: string): DataSourceOptions {
    name = name || this.getDefaultConnection();
    if (this.config[name]) {
      return this.config[name];
    }
    const baseConfig = this.app.config.get<DatabaseConfig>(
      `${DatabaseManager.configFile}`,
    );
    const connections = baseConfig.connections || {};
    if (!connections[name]) {
      throw new Error(`Database connection [${name}] not configured.`);
    }
    connections[name] = {
      ...connections[name],
      entities: baseConfig.entities,
    };
    this.config[name] = connections[name];
    return connections[name];
  }

  public getDefaultConnection() {
    return this.app.config.get<string>(
      `${DatabaseManager.configFile}.defaultConnection`,
    );
  }

  public connect() {
    this.db = new DataSource(this.configuration());
    return this.db.initialize();
  }
  public query<T = any>(
    ...params: Parameters<DataSource["query"]>
  ): Promise<T> {
    return this.db.query(...params);
  }

  public disconnect() {
    return this.db.destroy();
  }
  public getDataSource() {
    return this.db;
  }

  /*
   * Alias of getRepository
   */
  public use<T extends ObjectLiteral>(entity: EntityTarget<T>) {
    return this.db.getRepository(entity);
  }

  public __get(method: keyof DataSource): any {
    if (this.db) {
      if (get_class_methods(this.db).includes(method)) {
        return (...arg: any) => {
          return (this.db[method] as any).call(this.db, ...arg);
        };
      }
      if (Object.getOwnPropertyNames(this.db).includes(method)) {
        return this.db[method];
      }
    }
  }
}
export default useMagic<typeof DatabaseManager & Class<DataSource>>(
  DatabaseManager,
);
