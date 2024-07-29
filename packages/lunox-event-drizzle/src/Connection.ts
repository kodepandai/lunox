import { DB } from "@lunoxjs/drizzle";
import { QueueJobSchema, QueueJobFailedSchema } from "@lunoxjs/event/contracts";
import { BaseQueueConnection } from "@lunoxjs/event";
import { and, asc, eq, lte } from "drizzle-orm";

class Connection extends BaseQueueConnection {
  protected async storeJob(
    data: Pick<QueueJobSchema, "queue" | "payload" | "available_at">,
  ): Promise<void> {
    await (DB as any).insert(this.config.model.job).values(data);
  }

  protected async updateJob(queueJob: QueueJobSchema): Promise<void> {
    await (DB as any).update(this.config.model.job)
      .set(queueJob)
      .where(eq(this.config.model.job.id, queueJob.id));
  }

  protected async removeJob(queueJob: QueueJobSchema): Promise<void> {
    await (DB as any).delete(this.config.model.job).where(
      eq(this.config.model.job.id, queueJob.id),
    );
  }

  protected async storeFailedJob(
    data: Pick<
      QueueJobFailedSchema,
      "queue" | "payload" | "failed_at" | "exception"
    >,
  ): Promise<void> {
    await (DB as any).insert(this.config.model.failedJob).values(data);
  }

  protected async getLastJob(queue: string): Promise<QueueJobSchema | null> {
    const res = await (DB as any).select()
      .from(this.config.model.job)
      .where(
        and(
          eq(this.config.model.job.queue, queue),
          lte(this.config.model.job.available_at, new Date()),
        ),
      )
      .orderBy(asc(this.config.model.job.id))
      .limit(1);
    return res?.[0] as QueueJobSchema | null;
  }
}
export default Connection;
