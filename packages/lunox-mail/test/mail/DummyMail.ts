/// <reference types="@lunoxjs/view/global" />
import { Content, Envelope, Mailable } from "../../src";

class DummyMail extends Mailable {
  constructor(
    protected shouldQueue = false,
    protected subject?: string,
    protected text?: string,
    protected to?: string,
  ) {
    super();
  }

  public async envelope() {
    return new Envelope({
      to: this.to || "dummy@mail.com",
      subject: this.subject || "Test Email",
      cc: [],
      bcc: [],
    });
  }

  public async content() {
    const content = this.text
      ? this.text
      : this.shouldQueue
      ? "send dummy queue email"
      : "send dummy email";
    return new Content({ view: view("dummy", { content }) });
  }
}
export default DummyMail;
