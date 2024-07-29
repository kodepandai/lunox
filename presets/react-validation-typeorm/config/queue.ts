import { QueueConfig } from "@lunoxjs/event/contracts";
import { QueueJob, QueueJobFailed } from "@lunoxjs/event-typeorm/mysql";

export default {
  defaultConnection: env("QUEUE_CONNECTION", "database"),
  connections: {
    sync: {
      driver: "sync",
    },
    database: {
      driver: "typeorm",
      model: {
        job: QueueJob,
        failedJob: QueueJobFailed
      },
      queue: "default",
      retryAfter: 90,
    },
  },
} satisfies QueueConfig;
