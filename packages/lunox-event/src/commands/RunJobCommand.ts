import { Command } from "@lunoxjs/core/console";
import { HasSchedule } from "../contracts/console";
import Schedule from "../Schedule";

class RunJobCommand extends Command {
  protected signature = "schedule:run-job {--jobName=}";

  protected description = "Run Specific Job";

  public async handle() {
    const schedule = new Schedule();
    const jobName = this.option("jobName");
    this.lunox.make<HasSchedule>("ConsoleKernel").schedule(schedule);
    const jobList = schedule.jobList();
    const job = jobList.find((j) => j.name == jobName);
    if (job) {
      await job.action();
      return this.SUCCESS;
    }
    this.error("Job Not Found");
    return this.FAILURE;
  }
}
export default RunJobCommand;
