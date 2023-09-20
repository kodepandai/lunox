import { Application, handleMagicGet, useMagic } from "@lunoxjs/core";
import type { Class } from "@lunoxjs/core/contracts";
import { createTransport } from "nodemailer";
import type { MailerConfig, SupportedTransport } from "./contracts/Config";
import Mailer from "./Mailer";
export class MailManager {
  static symbol = Symbol("MailManager");
  protected transports: Record<string, ReturnType<typeof createTransport>> = {};

  constructor(protected app: Application) { }

  // Get the mail connection configuration
  protected getConfig(name: string) {
    return this.app.config.get("mail.mailers." + name);
  }

  protected resolve(name: string) {
    const config = this.getConfig(name);
    if (!config) {
      throw new Error(`Mailer [${name}] is not defined.`);
    }
    const mailer = new Mailer(name, this.createMailTransport(config));
    return mailer;
  }

  protected mailer(name?: string) {
    name = name || this.getDefaultDriver();
    return this.resolve(name);
  }

  public createMailTransport<T extends SupportedTransport>(
    config: MailerConfig<T>,
  ) {
    if (this.transports[config.transport]) {
      return this.transports[config.transport];
    }
    if (config.transport == "smtp") {
      const { host, port, encryption, username, password } =
        config as MailerConfig<"smtp">;
      return createTransport({
        secure: encryption == "tls" || port == 465,
        host,
        auth: {
          user: username,
          pass: password,
        },
        port: Number(port),
      });
    }
    //TODO: implement other transport type
    return createTransport();
  }

  public getDefaultDriver() {
    return this.app.config.get<string>("mail.default");
  }

  public __get(method: keyof Mailer): any {
    return handleMagicGet(this.mailer(), method);
  }
}
export default useMagic<typeof MailManager & Class<Mailer>>(MailManager);
