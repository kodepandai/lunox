import { QueueConfig } from "@lunoxjs/event/contracts";
import {
  queueJobs as queueJobsSqlite,
  queueFailedJobs as queueFailedJobsSqlite,
} from "../../src/models/sqlite";
import {
  queueJobs as queueJobsPostgre,
  queueFailedJobs as queueFailedJobsPostgre,
} from "../../src/models/postgre";
import {
  queueJobs as queueJobsMysql,
  queueFailedJobs as queueFailedJobsMysql,
} from "../../src/models/mysql";
export default {
  defaultConnection: "database",
  connections: {
    sqlite: {
      queue: "default",
      driver: "drizzle",
      model: {
        job: queueJobsSqlite,
        failedJob: queueFailedJobsSqlite,
      },
      retryAfter: 20,
    },
    mysql: {
      queue: "default",
      driver: "drizzle",
      model: {
        job: queueJobsMysql,
        failedJob: queueFailedJobsMysql,
      },
      retryAfter: 20,
    },
    postgres: {
      queue: "default",
      driver: "drizzle",
      model: {
        job: queueJobsPostgre,
        failedJob: queueFailedJobsPostgre,
      },
      retryAfter: 20,
    },
  },
} satisfies QueueConfig;
