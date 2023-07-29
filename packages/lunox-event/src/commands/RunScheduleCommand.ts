import { Command } from "@lunoxjs/core/console";
import { HasSchedule } from "../contracts/console";
import Schedule from "../Schedule";

class RunScheduleCommand extends Command {
  protected signature = "schedule:run";

  protected description = "Run Scheduler";

  public async handle() {
    const schedule = new Schedule();
    this.lunox.make<HasSchedule>("ConsoleKernel").schedule(schedule);
    await schedule.run();
    return this.KEEPALIVE;
  }
}
export default RunScheduleCommand;
