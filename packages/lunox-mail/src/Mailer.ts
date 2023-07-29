import type { Transporter } from "nodemailer";
import type { Addressable } from "./contracts/Mail";
import type Mailable from "./Mailable";
import { Queue } from "@lunoxjs/event";
import SendQueueMail from "./job/SendQueueMail";

class Mailer {
  protected $to?: Addressable;
  constructor(
    public driver: string,
    protected transporter: Transporter,
  ) {}
  to(to: Addressable) {
    this.$to = to;
    return this;
  }
  async send(
    mailable: Mailable,
    config: { preview?: boolean; delay?: Date } = {},
  ) {
    const html = await mailable.buildContent();
    if (config.preview) {
      return html;
    }
    let envelope = mailable.envelope();
    if (this.$to) {
      envelope = envelope.addTo(this.$to);
    }
    const { to, from, cc, bcc, replyTo, subject } = envelope;

    if (mailable.isShouldQueue()) {
      const mailConfig = { ...envelope, html };
      await Queue.add(
        new SendQueueMail(mailConfig),
        [mailConfig],
        config.delay,
      );
      return;
    }
    await this.transporter.sendMail({
      from,
      to,
      cc,
      bcc,
      replyTo,
      html,
      subject,
    });
  }
  public getTransporter() {
    return this.transporter;
  }
}
export default Mailer;
