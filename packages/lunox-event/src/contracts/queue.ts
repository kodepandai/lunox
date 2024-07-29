import { DispatchableConfig } from "../contracts/job";
import Dispatchable from "../Dispatchable";

export interface QueueDatabaseConnection {
  driver: "typeorm"|"prisma"|"eloquet"|"drizzle";
  model: {
    job: any,
    failedJob: any
  }
  queue: string;
  retryAfter: number;
}

export interface QueueSyncConnection {
  driver: "sync";
}
export interface QueueConfig {
  defaultConnection: string;
  connections: {
    [key: string]: QueueDatabaseConnection | QueueSyncConnection;
  };
}

export interface QueuePoolConfig {
  queue?: string;
  tries?: number;
}
export interface QueueConnection {
  add: (
    job: Dispatchable,
    args: any[],
    config?: DispatchableConfig,
  ) => Promise<void>;
  pool(config: QueuePoolConfig): Promise<void>;
}
export interface QueuePayload {
  job: string;
  args: any[];
  displayName: string;
  isListener: boolean;
}
