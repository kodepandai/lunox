import { Application, handleMagicGet, useMagic } from "@lunoxjs/core";
import { DatabaseConfig } from "./contracts";
import type {Drizzle} from "./index"

export class DatabaseManager {
  public static configFile = "database";
  public static symbol = Symbol("DrizzleDatabaseManager");
  protected db?: Drizzle;
  constructor(protected app: Application){}

  public databaseConfig(){
    return this.app.config.get<DatabaseConfig>(DatabaseManager.configFile);
  }
  public connect(){
    this.db = this.databaseConfig().drizzle()
  }
  public migrate(){
    return this.databaseConfig().migrator(this.db!, ({migrationsFolder: "drizzle"}))
  }
  public __get(method: string): any {
    return handleMagicGet(this.db, method);
  }
} 
export default useMagic<typeof DatabaseManager>(
  DatabaseManager,
);
