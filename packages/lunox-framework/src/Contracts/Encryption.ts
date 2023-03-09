export type CipherTypes =
  | "aes-128-cbc"
  | "aes-256-cbc"
  | "aes-128-gcm"
  | "aes-256-gcm";
export interface JsonPayload {
  iv: string;
  mac: string;
  value: string;
}
