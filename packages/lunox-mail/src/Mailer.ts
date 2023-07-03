import type { Transporter } from "nodemailer";
import type { Addressable } from "./contracts/Mail";
import type Mailable from "./Mailable";

class Mailer {
  protected $to?: Addressable;
  constructor(public driver: string, protected transporter: Transporter) { }
  to(to: Addressable) {
    this.$to = to;
    return this;
  }
  async send(mailable: Mailable, preview = false) {
    const html = await mailable.buildContent();
    if (preview) {
      return html;
    }
    let envelope = mailable.envelope();
    if (this.$to) {
      envelope = envelope.addTo(this.$to);
    }
    const { to, from, cc, bcc, replyTo, subject } = envelope;

    try {
      await this.transporter.sendMail({
        from,
        to,
        cc,
        bcc,
        replyTo,
        html,
        subject,
      });
    } catch (e) {
      if (!mailable.isShouldQueue()) {
        //TODO: change to queue system
        throw e;
      }
      console.log(e);
    }
  }
}
export default Mailer;
