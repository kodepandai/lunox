import { Application, useMagic } from "@lunoxjs/core";
import type { Class } from "@lunoxjs/core/contracts";
import { createTransport } from "nodemailer";
import type { MailerConfig, SupportedTransport } from "./contracts/Config";
import Mailer from "./Mailer";
export class MailManager {
  static symbol = Symbol("MailManager");
  protected mailers: Record<string, Mailer> = {};

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
    if (!this.mailers[name]) {
      this.mailers[name] = this.resolve(name);
    }
    return this.mailers[name];
  }

  public createMailTransport<T extends SupportedTransport>(
    config: MailerConfig<T>,
  ) {
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
    const mailer = this.mailer();
    if (mailer) {
      if (get_class_methods(mailer).includes(method)) {
        return (...arg: any) => {
          return (mailer[method] as any).call(mailer, ...arg);
        };
      }
      if (Object.getOwnPropertyNames(mailer).includes(method)) {
        return mailer[method];
      }
    }
  }
}
export default useMagic<typeof MailManager & Class<Mailer>>(MailManager);
