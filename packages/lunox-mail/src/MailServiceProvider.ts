import { ServiceProvider } from "@lunoxjs/core";
import MailManager from "./MailManager";
import { QueueManager } from "@lunoxjs/event";
import SendQueueMail from "./job/SendQueueMail";

class MailServiceProvider extends ServiceProvider {
  async register(): Promise<void> {
    this.app.singleton(MailManager.symbol, () => new MailManager(this.app));
  }
  async boot(): Promise<void> {
    QueueManager.registerJob(SendQueueMail.name, SendQueueMail);
  }
}
export default MailServiceProvider;
