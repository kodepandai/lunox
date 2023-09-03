import { EntityTarget } from "typeorm";

export interface QueueJobSchema {
  id: number;
  queue: string;
  payload: Buffer;
  attempts: number;
  reserved_at?: Date;
  available_at?: Date;
  created_at?: Date;
}
export interface QueueJobFailedSchema {
  id: number;
  queue: string;
  payload: Buffer;
  exception: string;
  failed_at?: Date;
}
export type QueueJob = EntityTarget<QueueJobSchema>;
export type QueueJobFailed = EntityTarget<QueueJobFailedSchema>;
