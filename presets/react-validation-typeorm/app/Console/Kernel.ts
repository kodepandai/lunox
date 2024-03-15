import { Kernel as ConsoleKernel } from "@lunoxjs/core/console";
import { Schedule } from "@lunoxjs/event";
import { HasSchedule } from "@lunoxjs/event/contracts";
import DummyJob from "../Jobs/DummyJob";

class Kernel extends ConsoleKernel implements HasSchedule {
  protected async commands() {
    await this.load(base_path("app/Console/Command"));
  }
  public schedule(schedule: Schedule): void {
    schedule
      .job(new DummyJob("hello from scheduler"))
      .interval("every 5 seconds");
  }
}

export default Kernel;
