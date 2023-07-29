import type Dispatchable from "./Dispatchable";
import type { JobOptions } from "bree";
import Bree from "bree";

let jobIndex = 0;
class Schedule {
  protected jobs: (JobOptions & {
    action: () => Promise<void>;
  })[] = [];
  private dispatchable?: Dispatchable;
  job(dispatchable: Dispatchable) {
    this.dispatchable = dispatchable;
    return this;
  }
  run() {
    const scheduler = new Bree({
      hasSeconds: true,
      doRootCheck: false,
      jobs: this.jobs.map((job) => ({ ...job, action: undefined })),
      root: false,
    });
    return scheduler.start();
  }
  cron(cron: string) {
    this.addJob({
      cron,
    });
  }
  interval(interval: string) {
    this.addJob({
      interval,
    });
  }
  private addJob(additionalData: Omit<JobOptions, "name">) {
    jobIndex++;
    if (this.dispatchable) {
      const name = (this.dispatchable?.constructor.name + jobIndex) as string;
      this.jobs.push({
        name,
        path: async () => {
          const { workerData } = await import("node:worker_threads");
          const { execSync } = await import("node:child_process");
          execSync(`npm run artisan -- schedule:run-job --jobName=${workerData.jobName}`, {
            stdio: "inherit",
          });
        },
        worker: {
          workerData: {
            jobName: name,
          },
        },
        action: this.dispatchable.handle.bind(this.dispatchable),
        ...additionalData,
      });
    }
    this.dispatchable = undefined;
  }
  jobList() {
    return this.jobs;
  }
}
export default Schedule;
