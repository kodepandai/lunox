import { QueueConfig } from "../../src/contracts";

export default {
  defaultConnection: "database",
  connections: {
    database: {
      queue: "default",
      driver: "typeorm",
      table: "queue_jobs",
      retryAfter: 20,
    },
  },
  jobPath: base_path("app/Jobs"),
  listenerPath: base_path("app/Listeners"),
} satisfies QueueConfig;
