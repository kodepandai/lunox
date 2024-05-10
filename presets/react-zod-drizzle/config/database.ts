import {} from "@lunoxjs/drizzle";
import type { DatabaseConfig } from "@lunoxjs/drizzle/contracts";
import { drizzle } from "drizzle-orm/mysql2";
import { migrate as migrator } from "drizzle-orm/mysql2/migrator";
import mysql from "mysql2/promise";
import * as schema from "database/schema";

const dbConfig = {
  drizzle() {
    const pool = mysql.createPool({
      host: env("DB_HOST", "localhost"),
      port: env("DB_PORT", 3306),
      user: env("DB_USER", "root"),
      password: env("DB_PASSWORD", "password"),
      database: env("DB_DATABASE", "lunox-drizzle"),
    });
    return drizzle(pool, { schema, mode: "default" });
  },
  migrator,
} satisfies DatabaseConfig;

declare module "@lunoxjs/drizzle" {
  interface Drizzle extends ReturnType<typeof dbConfig.drizzle> {}
}

export default dbConfig;
