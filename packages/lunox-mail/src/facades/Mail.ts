import { Facade, useFacade } from "@lunoxjs/core/facades";
import MailManager from "../MailManager";
class Mail extends Facade {
  static getFacadeAccessor() {
    return MailManager.symbol;
  }
}
export default useFacade<InstanceType<typeof MailManager>>(Mail);
