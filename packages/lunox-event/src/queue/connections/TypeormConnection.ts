import { Application, RuntimeException } from "@lunoxjs/core";
import { DB } from "@lunoxjs/typeorm";
import {
  QueueConnection,
  QueueDatabaseConnection,
  QueuePayload,
} from "../../contracts/queue";
import Dispatchable from "../../Dispatchable";
import { serialize, deserialize } from "v8";
import { IsNull, LessThanOrEqual } from "typeorm";
import Queue from "../../facades/Queue";
import { Class } from "@lunoxjs/core/contracts";

class TypeormConnection implements QueueConnection {
  constructor(
    protected app: Application,
    protected config: QueueDatabaseConnection,
  ) { }
  public async add(
    job: Dispatchable,
    args: any[],
    delayUntil?: Date,
  ): Promise<void> {
    let jobName = job.constructor.name;
    if (!job.isInternalJob()) {
      jobName =
        this.app.config.get(
          job.isListenerJob() ? "queue.listenerPath" : "queue.jobPath",
        ) +
        "/" +
        job.constructor.name +
        ".mjs";
    }
    await DB.use((await import("../../models/QueueJob")).default).insert({
      queue: this.config.queue,
      payload: serialize({
        displayName: job.constructor.name,
        job: jobName,
        isInternal: job.isInternalJob(),
        isListener: job.isListenerJob(),
        args,
      } satisfies QueuePayload),
      available_at: delayUntil || new Date(),
    });
  }

  public async pool(queue = "default"): Promise<void> {
    const queueJob = await DB.use(
      (await import("../../models/QueueJob")).default,
    ).findOne({
      order: { id: "DESC" },
      where: {
        queue,
        reserved_at: IsNull(),
        available_at: LessThanOrEqual(new Date()),
      },
    });
    if (!queueJob) return;

    const payload = deserialize(queueJob?.payload as any) as QueuePayload;
    let jobClass: Class<Dispatchable>;
    if (payload.isInternal) {
      jobClass = Queue.getInternalJob(payload.job);
      if (!jobClass)
        throw new RuntimeException(`Unknown internal job: ${payload.job}`);
    } else {
      jobClass = (await import(payload.job)).default;
      if (!jobClass)
        throw new RuntimeException(`Job not found: ${payload.job}`);
    }
    const job = new jobClass(...payload.args) as Dispatchable;
    queueJob.reserved_at = new Date();
    queueJob.attempts++;
    await DB.use((await import("../../models/QueueJob")).default).save(
      queueJob,
    );
    try {
      //TODO: handle retry if failed
      if (payload.isListener) {
        await job.handle(...payload.args);
      } else {
        await job.handle();
      }
    } catch (e) {
      if (e instanceof Error) {
        await DB.use(
          (await import("../../models/QueueJobFailed")).default,
        ).insert({
          queue,
          failed_at: new Date(),
          payload: queueJob?.payload,
          exception: e.stack,
        });
      }
    } finally {
      await DB.use((await import("../../models/QueueJob")).default).remove(
        queueJob,
      );
    }
  }
}
export default TypeormConnection;
