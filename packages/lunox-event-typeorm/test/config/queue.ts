import { QueueConfig } from "@lunoxjs/event/contracts";
import { QueueJob as QueueJobMysql, QueueJobFailed as QueueJobFailedMysql } from "../../src/models/mysql";
import { QueueJob as QueueJobSqlite, QueueJobFailed as QueueJobFailedSqlite } from "../../src/models/sqlite";
import { QueueJob as QueueJobPg, QueueJobFailed as QueueJobFailedPg } from "../../src/models/postgre";
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
