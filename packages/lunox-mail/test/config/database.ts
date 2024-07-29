import type { DatabaseConfig } from "@lunoxjs/typeorm/contracts";
import {QueueJob, QueueJobFailed} from "@lunoxjs/event-typeorm/mysql";

export default {
  defaultConnection: env("DB_CONNECTION", "mysql"),
  entities: [],
  connections: {
    mysql: {
      type: "mysql",
      entities: [QueueJob, QueueJobFailed],
      host: env("DB_HOST", "localhost"),
      port: env("DB_PORT", "3306"),
      username: env("DB_USERNAME"),
      password: env("DB_PASSWORD"),
      database: env("DB_DATABASE"),
      synchronize: true,
      logging: false,
      migrations: [],
      migrationsTableName: "migrations",
      subscribers: [],
      timezone: "+07:00",
    },
  },
} satisfies DatabaseConfig;
