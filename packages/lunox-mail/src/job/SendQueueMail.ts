import { Dispatchable } from "@lunoxjs/event";
import { Options } from "nodemailer/lib/mailer";
import Mail from "../facades/Mail";

class SendQueueMail extends Dispatchable {
  protected shouldQueue = true;
  protected isInternal = true;
  constructor(protected mailOptions: Options) {
    super();
  }
  async handle(): Promise<void> {
    await Mail.getTransporter().sendMail(this.mailOptions);
  }
}
export default SendQueueMail;
