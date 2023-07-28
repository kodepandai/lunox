import type Content from "./Content";
import type Envelope from "./Envelope";

abstract class Mailable {
  protected shouldQueue = false;
  public envelope(): Envelope {
    throw new Error("Method not implemented.");
  }

  public content(): Content {
    throw new Error("Method not implemented.");
  }

  public async buildContent(): Promise<string> {
    const content = this.content();
    if (content.hasView()) {
      const res = await content.getView()?.render();
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
