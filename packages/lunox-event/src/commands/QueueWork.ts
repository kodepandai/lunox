import { Command } from "@lunoxjs/core/console";
import Queue from "../facades/Queue";

class QueueWork extends Command {
  protected signature =
    "queue:work {--interval=1} {--tries=1} {--queue=default}";
  protected description = "run queue in background";

  public async handle() {
    const tries = Number(this.option("tries"));
    const queue = this.option("queue");
    this.info("Queue Running... interval: " + this.option("interval") + "s");
    let isPooling = false;
    setInterval(
      async () => {
        if (isPooling) return;
        isPooling = true;
        try {
          await Queue.pool({ tries, queue });
        } catch (err) {
          console.log(err);
        } finally {
          isPooling = false;
        }
      },
      Number(this.option("interval") * 1000),
    );
    return this.KEEPALIVE;
  }
}
export default QueueWork;
