import { Dispatchable } from "@lunoxjs/event";
import Mail from "../facades/Mail";
import { Options } from "nodemailer/lib/mailer";

class SendQueuedMailable extends Dispatchable {
  protected shouldQueue = true;
  protected metaUrl = import.meta.url;
  constructor(protected mailOptions: Options) {
    super();
  }
  async handle(): Promise<void> {
    await Mail.getTransporter().sendMail(this.mailOptions);
  }
}
export default SendQueuedMailable;
