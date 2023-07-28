import { Content, Envelope, Mailable } from "../../src";

class DummyMail extends Mailable {
  protected shouldQueue = false;

  public envelope(): Envelope {
    return new Envelope({
      to: "dummy@mail.com",
      subject: "Test Email",
      cc: [],
      bcc: [],
    });
  }

  public content(): Content {
    return new Content({ html: "send dummy email" });
  }
}
export default DummyMail;
