import { Arr } from "@lunoxjs/core";
import type { Addressable, EnvelopeConfig } from "./contracts/Mail";

class Envelope {
  public from?: Addressable;
  public replyTo?: Addressable;
  public to?: Addressable[];
  public cc?: Addressable[];
  public bcc?: Addressable[];
  constructor(protected addresses: EnvelopeConfig) {
    const { from, to, cc, bcc, replyTo } = addresses;
    const globalFrom = config("mail.from");
    // set from address from mail config
    this.from = globalFrom;
    // override from when client add custom from address
    if (from) {
      this.from = from;
    }
    if (to) {
      this.to = this.normaliseAddress(to);
    }
    if (cc) {
      this.cc = this.normaliseAddress(cc);
    }
    if (bcc) {
      this.bcc = this.normaliseAddress(bcc);
    }
    if (replyTo) {
      this.replyTo = replyTo;
    }
  }

  protected normaliseAddress(address: Addressable | Addressable[]) {
    return Arr.wrap(address);
  }

  public addTo(to: Addressable) {
    this.to = [...(this.to || []), to];
    return this;
  }
}
export default Envelope;
