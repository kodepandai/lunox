import { QueueConfig } from "../../src/contracts";
import { QueueJob as QueueJobMysql } from "@lunoxjs/event-typeorm/mysql";
import { QueueJob as QueueJobSqlite } from "@lunoxjs/event-typeorm/sqlite";
import { QueueJob as QueueJobPg } from "@lunoxjs/event-typeorm/postgre";
import { QueueJobFailed as QueueJobFailedMysql } from "@lunoxjs/event-typeorm/mysql";
import { QueueJobFailed as QueueJobFailedSqlite } from "@lunoxjs/event-typeorm/sqlite";
import { QueueJobFailed as QueueJobFailedPg } from "@lunoxjs/event-typeorm/postgre";

export default {
  defaultConnection: "database",
  connections: {
    sqlite: {
      queue: "default",
      driver: "typeorm",
      model: {
        job: QueueJobSqlite,
        failedJob: QueueJobFailedSqlite,
      },
      retryAfter: 20,
    },
    mysql: {
      queue: "default",
      driver: "typeorm",
      model: {
        job: QueueJobMysql,
        failedJob: QueueJobFailedMysql,
      },
      retryAfter: 20,
    },
    postgres: {
      queue: "default",
      driver: "typeorm",
      model: {
        job: QueueJobPg,
        failedJob: QueueJobFailedPg,
      },
      retryAfter: 20,
    },
  },
} satisfies QueueConfig;
