import type { DatabaseConfig } from "@lunoxjs/typeorm/contracts";
import QueueJobSqlite from "../app/models/typeorm/QueueJobSqlite";
import QueueJobFailedSqlite from "../app/models/typeorm/QueueJobFailedSqlite";
import QueueJobMysql from "../app/models/typeorm/QueueJobMysql";
import QueueJobFailedMysql from "../app/models/typeorm/QueueJobFailedMysql";
import QueueJobPg from "../app/models/typeorm/QueueJobPg";
import QueueJobFailedPg from "../app/models/typeorm/QueueJobFailedPg";

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
