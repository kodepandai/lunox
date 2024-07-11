import type { DatabaseConfig } from "@lunoxjs/typeorm/contracts";
import QueueJobMysql from "../models/typeorm/QueueJobMysql";
import QueueJobFailedMysql from "../models/typeorm/QueueJobFailedMysql";

export default {
  defaultConnection: env("DB_CONNECTION", "mysql"),
  entities: [],
  connections: {
    mysql: {
      type: "mysql",
      entities: [QueueJobMysql, QueueJobFailedMysql],
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
