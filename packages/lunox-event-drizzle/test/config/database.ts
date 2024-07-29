import { } from "@lunoxjs/drizzle";
import type { DatabaseConfig } from "@lunoxjs/drizzle/contracts";
import { drizzle as drizzlePg } from "drizzle-orm/node-postgres";
import { drizzle as drizzleSqlite } from "drizzle-orm/better-sqlite3";
import { drizzle as drizzleMysql } from "drizzle-orm/mysql2";
import { migrate as migratorPg } from "drizzle-orm/node-postgres/migrator";
import { migrate as migratorMysql } from "drizzle-orm/mysql2/migrator";
import { migrate as migratorSqlite } from "drizzle-orm/better-sqlite3/migrator";
import pg from "pg";
import sqlite from "better-sqlite3";
import mysql from "mysql2";
import * as mysqlSchema from "../../src/models/mysql";
import * as sqliteSchema from "../../src/models/sqlite";
import * as pgSchema from "../../src/models/postgre";

export const sqliteConfig = {
  connection: "sqlite",
  drizzle() {
    const sqliteClient = new sqlite(base_path("database.sqlite"));
    return drizzleSqlite(sqliteClient, { schema: sqliteSchema });
  },
  migrator: migratorSqlite,
} satisfies DatabaseConfig & { connection: "sqlite" };
export const mysqlConfig = {
  drizzle() {
    const mysqlClient = mysql.createConnection({
      host: env("DB_HOST_MYSQL", "localhost"),
      port: env("DB_PORT_MYSQL", 3306),
      user: env("DB_USERNAME_MYSQL", "root"),
      password: env("DB_PASSWORD_MYSQL", "password"),
      database: env("DB_DATABASE_MYSQL", "lunox-drizzle"),
    });
    return drizzleMysql(mysqlClient, {
      schema: mysqlSchema,
      mode: "default",
    });
  },
  migrator: migratorMysql,
} satisfies DatabaseConfig;

export const pgConfig = {
  drizzle() {
    const pgClient = new pg.Pool({
      host: env("DB_HOST_PG", "localhost"),
      port: env("DB_PORT_PG", 5432),
      user: env("DB_USERNAME_PG", "root"),
      password: env("DB_PASSWORD_PG", "password"),
      database: env("DB_DATABASE_PG", "lunox-drizzle"),
    });
    return drizzlePg(pgClient, { schema: pgSchema });
  },
  migrator: migratorPg,
} satisfies DatabaseConfig;

interface DB {
  insert: any;
  update: any;
  delete: any;
  select: any;
}
declare module "@lunoxjs/drizzle" {
  interface Drizzle extends DB { }
}
export default mysqlConfig;
