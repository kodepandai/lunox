import { QueueConfig } from "@lunoxjs/event/contracts";
import QueueJobMysql from "../models/typeorm/QueueJobMysql"
import QueueJobFailedMysql from "../models/typeorm/QueueJobFailedMysql";

export default {
  defaultConnection: env("QUEUE_CONNECTION", "database"),
  connections: {
    sync: {
      driver: "sync",
    },
    database: {
      driver: "typeorm",
      model: {
        job: QueueJobMysql,
        failedJob: QueueJobFailedMysql
      },
      queue: "default",
      retryAfter: 90,
    },
  },
} satisfies QueueConfig;
