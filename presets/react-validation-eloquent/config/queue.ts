import { QueueConfig } from "@lunoxjs/event/contracts";

export default {
  defaultConnection: env("QUEUE_CONNECTION", "sync"),
  connections: {
    sync: {
      driver: "sync",
    },
    // TODO: support eloquent driver
    // database: {
    //   driver: "eloquent",
    //   table: "queue_jobs",
    //   queue: "default",
    //   retryAfter: 90,
    // },
  },
} satisfies QueueConfig;
