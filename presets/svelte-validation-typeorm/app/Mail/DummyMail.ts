import { Content, Envelope, Mailable, Attachment } from "@lunoxjs/mail";

class DummyMail extends Mailable {
  protected shouldQueue = true;
  constructor(public message: string) {
    super();
  }

  public async envelope(): Promise<Envelope> {
    return new Envelope({
      to: "receiver@mail.com",
      subject: "Test Dummy Mail",
    });
  }

  public async content(): Promise<Content> {
    return new Content({
      view: view("mail.dummy", { title: "Hello World", message: this.message }),
    });
  }

  public async attachments(): Promise<Attachment[]> {
    return [];
  }
}
export default DummyMail;
