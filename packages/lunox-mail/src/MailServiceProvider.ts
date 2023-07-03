import { ServiceProvider } from "@lunoxjs/core";
import MailManager from "./MailManager";

class MailServiceProvider extends ServiceProvider {
  async register(): Promise<void> {
    this.app.singleton(MailManager.symbol, () => new MailManager(this.app));
  }
}
export default MailServiceProvider;
