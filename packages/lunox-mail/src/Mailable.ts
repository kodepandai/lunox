import { Attachment } from "nodemailer/lib/mailer";
import type Content from "./Content";
import type Envelope from "./Envelope";

abstract class Mailable {
  protected shouldQueue = false;
  public async envelope(): Promise<Envelope> {
    throw new Error("Method not implemented.");
  }

  public async content(): Promise<Content> {
    throw new Error("Method not implemented.");
  }

  public async attachments(): Promise<Attachment[]> {
    return [];
  }

  public async buildContent(): Promise<string> {
    const content = await this.content();
    if (content.hasView()) {
      const res = await content.getView()?.serverSideOnly().render();
      return res?.getOriginal() as string;
    }
    if (content.hasHtml()) {
      return content.getHtml() as string;
    }
    return "";
  }
  isShouldQueue() {
    return this.shouldQueue;
  }
}
export default Mailable;
