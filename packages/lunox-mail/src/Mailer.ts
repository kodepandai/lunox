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
  ) { }
  to(to: Addressable) {
    this.$to = to;
    return this;
  }
  async send(
    mailable: Mailable,
    config: { preview?: boolean; delay?: Date; connection?: string } = {},
  ) {
    const html = await mailable.buildContent();
    if (config.preview) {
      return html;
    }
    let envelope = await mailable.envelope();
    if (this.$to) {
      envelope = envelope.addTo(this.$to);
    }
    const { to, from, cc, bcc, replyTo, subject } = envelope;
    const attachments = await mailable.attachments();

    if (mailable.isShouldQueue()) {
      const mailConfig = { ...envelope, html, attachments };
      await Queue.add(new SendQueueMail(mailConfig), [mailConfig], {
        delay: config.delay,
        connection: config.connection,
      });
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
      attachments,
    });
  }
  public getTransporter() {
    return this.transporter;
  }
}
export default Mailer;
