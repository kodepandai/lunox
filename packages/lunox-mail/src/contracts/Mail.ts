import { View } from "@lunoxjs/view";
export type Addressable = string | Address;
export interface Address {
  name: string;
  address: string;
}

export interface EnvelopeConfig {
  from?: Addressable;
  to?: Addressable | Addressable[];
  cc?: Addressable | Addressable[];
  bcc?: Addressable | Addressable[];
  replyTo?: Addressable;
  subject: string;
}
export interface ContentConfig {
  view?: View;
  html?: string;
}
