import { DatabaseConfig } from "@lunoxjs/drizzle/contracts";
import {} from "@lunoxjs/drizzle"
import { drizzle } from "drizzle-orm/better-sqlite3";
import { migrate as migrator } from "drizzle-orm/better-sqlite3/migrator";
import Database from "better-sqlite3"
import * as schema from "../database/drizzleSchema"

const dbConfig = {
  drizzle(){
    return drizzle(new Database(base_path('database/database.sqlite')), {schema});
  },
  migrator,
} satisfies DatabaseConfig;

declare module "@lunoxjs/drizzle" {
  interface Drizzle extends ReturnType<typeof dbConfig.drizzle> { }
}

export default dbConfig;
