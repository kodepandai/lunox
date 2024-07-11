import { QueueConfig } from "@lunoxjs/event/contracts";

export default {
  defaultConnection: env("QUEUE_CONNECTION", "database"),
  connections: {
    sync: {
      driver: "sync",
    },
    database: {
      driver: "typeorm",
      model: {
        job:"",
        failedJob: ""
      },
      queue: "default",
      retryAfter: 90,
    },
  },
} satisfies QueueConfig;
