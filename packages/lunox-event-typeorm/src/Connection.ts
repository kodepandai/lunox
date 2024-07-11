import { DB } from "@lunoxjs/typeorm";
import { QueueJobSchema, QueueJobFailedSchema } from "@lunoxjs/event/contracts";
import { BaseQueueConnection } from "@lunoxjs/event";
import { LessThanOrEqual } from "typeorm";

class Connection extends BaseQueueConnection {
  protected async storeJob(
    data: Pick<QueueJobSchema, "queue" | "payload" | "available_at">,
  ): Promise<void> {
    await DB.use(this.config.model.job).insert(data);
  }

  protected async updateJob(queueJob: QueueJobSchema): Promise<void> {
    await DB.use(this.config.model.job).save(queueJob);
  }

  protected async removeJob(queueJob: QueueJobSchema): Promise<void> {
    await DB.use(this.config.model.job).remove(queueJob);
  }

  protected async storeFailedJob(
    data: Pick<
      QueueJobFailedSchema,
      "queue" | "payload" | "failed_at" | "exception"
    >,
  ): Promise<void> {
    await DB.use(this.config.model.failedJob).insert(data);
  }

  protected getLastJob(queue: string): Promise<QueueJobSchema | null> {
    return DB.use(this.config.model.job).findOne({
      order: { id: "ASC" },
      where: {
        queue,
        available_at: LessThanOrEqual(new Date()),
      },
    }) as Promise<QueueJobSchema | null>;
  }
}
export default Connection;
