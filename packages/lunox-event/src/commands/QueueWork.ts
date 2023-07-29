import { Command } from "@lunoxjs/core/console";
import Queue from "../facades/Queue";

class QueueWork extends Command {
  protected signature = "queue:work {--interval=1}";
  protected description = "run queue in background";

  public async handle() {
    this.info("Queue Running... interval: " + this.option("interval") + "s");
    let isPooling = false;
    setInterval(async () => {
      if (isPooling) return;
      isPooling = true;
      try {
        await Queue.pool();
      } catch (err) {
        console.log(err);
      } finally {
        isPooling = false;
      }
    }, Number(this.option("interval") * 1000));
    return this.KEEPALIVE;
  }
}
export default QueueWork;
