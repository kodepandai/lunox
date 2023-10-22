import { Application, RuntimeException } from "@lunoxjs/core";
import { DB } from "@lunoxjs/typeorm";
import {
  QueueConnection,
  QueueDatabaseConnection,
  QueuePayload,
} from "../../contracts/queue";
import Dispatchable from "../../Dispatchable";
import { serialize, deserialize } from "v8";
import { LessThanOrEqual } from "typeorm";
import { Class } from "@lunoxjs/core/contracts";
import { DispatchableConfig } from "../../contracts/job";
import { QueueJobFailedModel, QueueJobModel } from "../../symbols";
import dayjs from "dayjs";

class TypeormConnection implements QueueConnection {
  constructor(
    protected app: Application,
    protected config: QueueDatabaseConnection,
  ) { }
  public async add(
    job: Dispatchable,
    args: any[],
    config?: DispatchableConfig,
  ): Promise<void> {
    let jobName = job.constructor.name;
    jobName = job.displayName();
    await DB.use(this.app.make(QueueJobModel)).insert({
      queue: config?.connection || this.config.queue,
      payload: serialize({
        displayName: job.constructor.name,
        job: jobName,
        isListener: job.isListenerJob(),
        args,
      } satisfies QueuePayload),
      available_at: config?.delay || new Date(),
    });
  }

  public async pool({ queue = "default", tries = 1 }): Promise<void> {
    const queueJob = await DB.use(this.app.make(QueueJobModel)).findOne({
      order: { id: "ASC" },
      where: {
        queue,
        available_at: LessThanOrEqual(new Date()),
      },
    });
    if (!queueJob) return;

    let job: Dispatchable | undefined;
    try {
      const payload = deserialize(queueJob?.payload as any) as QueuePayload;
      let jobClass: Class<Dispatchable>;
      jobClass = (await import(payload.job)).default;
      if (!jobClass)
        throw new RuntimeException(`Job not found: ${payload.job}`);
      job = new jobClass(...payload.args) as Dispatchable;
      queueJob.reserved_at = new Date();
      queueJob.attempts++;
      await DB.use(this.app.make(QueueJobModel)).save(queueJob);
      if (payload.isListener) {
        await job.handle(...payload.args);
      } else {
        await job.handle();
      }
      await DB.use(this.app.make(QueueJobModel)).remove(queueJob);
    } catch (e) {
      if (e instanceof Error) {
        // if attempts is less than max retries then update available_at + retryAfter
        if (queueJob.attempts < (job?.tries || tries)) {
          queueJob.available_at = dayjs()
            .add(this.config.retryAfter, "seconds")
            .toDate();
          await DB.use(this.app.make(QueueJobModel)).save(queueJob);
        } else {
          // if attempts is greater than max retries then mark job as failed
          await DB.use(this.app.make(QueueJobFailedModel)).insert({
            queue,
            failed_at: new Date(),
            payload: queueJob?.payload,
            exception: e.stack,
          });
          await DB.use(this.app.make(QueueJobModel)).remove(queueJob);
          try {
            job?.failed?.(e);
          } catch (e) {
            //pass
          }
        }
      }
    }
  }
}
export default TypeormConnection;
