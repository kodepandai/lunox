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
} satisfies QueueConfig;
