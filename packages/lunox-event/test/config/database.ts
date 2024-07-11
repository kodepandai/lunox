import type { DatabaseConfig } from "@lunoxjs/typeorm/contracts";
import { QueueJob as QueueJobMysql } from "@lunoxjs/event-typeorm/mysql";
import { QueueJob as QueueJobSqlite } from "@lunoxjs/event-typeorm/sqlite";
import { QueueJob as QueueJobPg } from "@lunoxjs/event-typeorm/postgre";
import { QueueJobFailed as QueueJobFailedMysql } from "@lunoxjs/event-typeorm/mysql";
import { QueueJobFailed as QueueJobFailedSqlite } from "@lunoxjs/event-typeorm/sqlite";
import { QueueJobFailed as QueueJobFailedPg } from "@lunoxjs/event-typeorm/postgre";

export default {
  defaultConnection: env("DB_CONNECTION", "sqlite"),
  entities: [],
  connections: {
    sqlite: {
      entities: [QueueJobSqlite, QueueJobFailedSqlite],
      type: "sqlite",
      database: base_path("database.sqlite"),
      synchronize: true,
      logging: false,
      migrations: [],
      migrationsTableName: "migrations",
    },
    mysql: {
      type: "mysql",
      entities: [QueueJobMysql, QueueJobFailedMysql],
      database: env("DB_DATABASE_MYSQL"),
      synchronize: true,
      logging: false,
      migrations: [],
      migrationsTableName: "migrations",
      username: env("DB_USERNAME_MYSQL"),
      password: env("DB_PASSWORD_MYSQL"),
      host: env("DB_HOST_MYSQL"),
      port: env("DB_PORT_MYSQL", 3306),
    },
    postgres: {
      type: "postgres",
      entities: [QueueJobPg, QueueJobFailedPg],
      database: env("DB_DATABASE_PG"),
      synchronize: true,
      logging: false,
      migrations: [],
      migrationsTableName: "migrations",
      username: env("DB_USERNAME_PG"),
      password: env("DB_PASSWORD_PG"),
      host: env("DB_HOST_PG"),
      port: env("DB_PORT_PG", 5432),
    },
  },
} satisfies DatabaseConfig;
