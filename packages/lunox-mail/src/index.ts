import Content from "./Content";
import Envelope from "./Envelope";
import Mailable from "./Mailable";
import MailManager from "./MailManager";
import Mail from "./facades/Mail";
import MailServiceProvider from "./MailServiceProvider";
import type { Attachment } from "nodemailer/lib/mailer";

export {
  Mailable,
  MailManager,
  Mail,
  MailServiceProvider,
  Envelope,
  Content,
  Attachment,
};
