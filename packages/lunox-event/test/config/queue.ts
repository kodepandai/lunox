import { QueueConfig } from "../../src/contracts";
import QueueJobFailedMysql from "../app/models/typeorm/QueueJobFailedMysql";
import QueueJobFailedPg from "../app/models/typeorm/QueueJobFailedPg";
import QueueJobFailedSqlite from "../app/models/typeorm/QueueJobFailedSqlite";
import QueueJobMysql from "../app/models/typeorm/QueueJobMysql";
import QueueJobPg from "../app/models/typeorm/QueueJobPg";
import QueueJobSqlite from "../app/models/typeorm/QueueJobSqlite";

export default {
  defaultConnection: "database",
  connections: {
    sqlite: {
      queue: "default",
      driver: "typeorm",
      model: {
        job: QueueJobSqlite,
        failedJob: QueueJobFailedSqlite
      },
      retryAfter: 20,
    },
    mysql: {
      queue: "default",
      driver: "typeorm",
      model: {
        job: QueueJobMysql,
        failedJob: QueueJobFailedMysql
      },
      retryAfter: 20,
    },
    postgres: {
      queue: "default",
      driver: "typeorm",
      model: {
        job: QueueJobPg,
        failedJob: QueueJobFailedPg
      },
      retryAfter: 20,
    },
  },
} satisfies QueueConfig;
