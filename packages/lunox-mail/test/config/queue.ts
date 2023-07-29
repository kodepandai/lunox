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
  jobPath: base_path("app/Jobs"),
  listenerPath: base_path("app/Listeners"),
} satisfies QueueConfig;
