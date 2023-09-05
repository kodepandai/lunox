import { QueueConfig } from "@lunoxjs/event/contracts";

export default {
  defaultConnection: env("QUEUE_CONNECTION", "database"),
  connections: {
    sync: {
      driver: "sync",
    },
    database: {
      driver: "typeorm",
      table: "queue_jobs",
      queue: "default",
      retryAfter: 90,
    },
  },
} satisfies QueueConfig;
