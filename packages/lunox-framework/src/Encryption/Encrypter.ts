/* eslint-disable no-prototype-builtins */
// credit to @Agoreddah for nodejs ecnryption laravel support
// https://gist.github.com/Agoreddah/511864e2c00da064586523b3087c30e2
import crypto from "crypto";
import { RuntimeException } from "../Foundation/Exception";
import type { CipherTypes, JsonPayload } from "../Contracts/Encryption";
import DecryptException from "./DecryptException";
import type { ObjectOf } from "../Types";
import hashEquals from "hash-equals";

class Encrypter {
  protected key!: Buffer;
  protected cipher!: CipherTypes;
  private static supportedCiphers = {
    "aes-128-cbc": { size: 16, aead: false },
    "aes-256-cbc": { size: 32, aead: false },
    "aes-128-gcm": { size: 16, aead: true },
    "aes-256-gcm": { size: 32, aead: true },
  };

  constructor(key: Buffer, cipher: CipherTypes = "aes-128-cbc") {
    if (!Encrypter.supported(key, cipher)) {
      const ciphers = Object.keys(Encrypter.supportedCiphers).join(", ");
      throw new RuntimeException(
        `Unsupported cipher or incorrect key length. Supported ciphers are: ${ciphers}.`
      );
    }
    this.key = key;
    this.cipher = cipher;
  }

  public getKey() {
    return this.key;
  }

  public static supported(key: Buffer, cipher: CipherTypes) {
    if (!Encrypter.supportedCiphers[cipher]) return false;
    return key.length === Encrypter.supportedCiphers[cipher]["size"];
  }

  public static generateKey(cipher: CipherTypes) {
    return crypto.randomBytes(Encrypter.supportedCiphers[cipher]["size"] || 32);
  }

  public encrypt(value: any, needSerialize = true) {
    const serializedValue = needSerialize ? JSON.stringify(value) : value;
    try {
      const ivBuffer = crypto.randomBytes(
        crypto.getCipherInfo(this.cipher)?.ivLength as number
      );
      const iv = Encrypter.base64Encode(ivBuffer);

      const cipher = crypto.createCipheriv(this.cipher, this.key, ivBuffer);

      let value = cipher.update(serializedValue, "utf8", "base64");
      value += cipher.final("base64");
      const mac = this.hash(iv, value);

      const jsonObject = {
        iv,
        value,
        mac,
      };

      const json = JSON.stringify(jsonObject);

      return Encrypter.base64Encode(json);
    } catch (e) {
      throw new Error("Cannot encrypt data provided !");
    }
  }

  encryptString(value: string) {
    return this.encrypt(value, false);
  }

  decrypt(payloadString: string, needUnserialize = true) {
    const payload = this.getJsonPayload(payloadString);
    const iv = Encrypter.base64Decode(payload.iv);
    const decipher = crypto.createDecipheriv(this.cipher, this.key, iv);

    let decrypted = decipher.update(payload.value, "base64", "utf8");
    decrypted += decipher.final("utf8");
    return needUnserialize ? JSON.parse(decrypted) : decrypted;
  }

  decryptString(payloadString: string) {
    return this.decrypt(payloadString, false);
  }

  hash(iv: string, value: string) {
    if (!iv) {
      throw new Error("Iv is not defined !");
    }
    if (!value) {
      throw new Error("Value is not defined !");
    }
    const data = String(iv) + String(value);
    return this.hashHmac("sha256", data, this.key);
  }
  hashHmac(algoritm: "sha1" | "sha256", data: string, key: Buffer) {
    const hmac = crypto.createHmac(algoritm, key);
    hmac.update(data);
    return hmac.digest("hex");
  }

  protected getJsonPayload(payload: string) {
    let json = {};
    try {
      json = JSON.parse(Encrypter.base64Decode(payload).toString());
    } catch (e) {
      throw new DecryptException("Payload cannot be parsed !");
    }

    if (!this.isValidPayload(json)) {
      throw new DecryptException("Payload is not valid !");
    }

    if (!this.isValidMac(json as JsonPayload)) {
      throw new DecryptException("Mac is not valid !");
    }

    return json as JsonPayload;
  }
  protected isValidPayload(payload: ObjectOf<any>) {
    return (
      payload.hasOwnProperty("iv") &&
      payload.hasOwnProperty("value") &&
      payload.hasOwnProperty("mac")
    );
  }
  protected isValidMac(payload: JsonPayload) {
    return this.hash(payload.iv, payload.value) === payload.mac;
  }

  public static hashEquals(answer: string, guess: string) {
    return hashEquals(answer, guess);
  }

  public static base64Encode(value: string | Buffer) {
    if (typeof value == "string") {
      value = Buffer.from(value);
    }
    return value.toString("base64");
  }

  public static base64Decode(value: string) {
    return Buffer.from(value, "base64");
  }
}

export default Encrypter;
