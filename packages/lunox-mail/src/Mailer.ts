import type { Transporter } from "nodemailer";
import type { Addressable } from "./contracts/Mail";
import type Mailable from "./Mailable";
import { Queue } from "@lunoxjs/event";
import SendQueuedMailable from "./job/SendQueuedMailable";

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
    config: { preview?: boolean; delay?: Date; connection?: string } = {},
  ) {
    const mailConfig = await this.extractMailable(mailable, config.preview);
    if (config.preview) return mailConfig.html;
    if (mailable.isShouldQueue() && !config.preview) {
      await Queue.add(new SendQueuedMailable(mailConfig), [mailConfig], {
        delay: config.delay,
        connection: config.connection,
      });
      return;
    }
    await this.transporter.sendMail(mailConfig);
  }
  public getTransporter() {
    return this.transporter;
  }
  public async extractMailable(mailable: Mailable, isPreview = false) {
    const html = await mailable.buildContent();
    if (isPreview) {
      return { html };
    }
    let envelope = await mailable.envelope();
    if (this.$to) {
      envelope = envelope.addTo(this.$to);
    }
    const { to, from, cc, bcc, replyTo, subject } = envelope;
    const attachments = await mailable.attachments();
    return { to, from, cc, bcc, replyTo, subject, attachments, html };
  }
}
export default Mailer;
