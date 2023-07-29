import { DispatchableConfig } from "../contracts/job";
import Dispatchable from "../Dispatchable";

export interface QueueDatabaseConnection {
  driver: "typeorm";
  table: string;
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
  jobPath: string;
  listenerPath: string;
}

export interface QueueConnection {
  add: (
    job: Dispatchable,
    args: any[],
    config?: DispatchableConfig,
  ) => Promise<void>;
  pool(): Promise<void>;
}
export interface QueuePayload {
  job: string;
  args: any[];
  displayName: string;
  isListener: boolean;
  isInternal: boolean;
}
