import type { MailConfig } from "@lunoxjs/mail/contracts";

export default {
  /*
  |--------------------------------------------------------------------------
  | Default Mailer
  |--------------------------------------------------------------------------
  |
  | This option controls the default mailer that is used to send any email
  | messages sent by your application. Alternative mailers may be setup
  | and used as needed; however, this mailer will be used by default.
  |
  */

  default: env("MAIL_MAILER", "smtp"),

  /*
  |--------------------------------------------------------------------------
  | Mailer Configurations
  |--------------------------------------------------------------------------
  |
  | Here you may configure all of the mailers used by your application plus
  | their respective settings. Several examples have been configured for
  | you and you are free to add your own as your application requires.
  |
  | Laravel supports a variety of mail "transport" drivers to be used while
  | sending an e-mail. You will specify which one you are using for your
  | mailers below. You are free to add additional mailers as required.
  |
  | Supported: "smtp", "sendmail", "mailgun", "ses",
  |            "postmark", "log", "array"
  |
  */

  mailers: {
    smtp: {
      transport: "smtp",
      host: env("MAIL_HOST", "smtp.mailgun.org"),
      port: env("MAIL_PORT", 587),
      encryption: env("MAIL_ENCRYPTION", "tls"),
      username: env("MAIL_USERNAME"),
      password: env("MAIL_PASSWORD"),
    },
  },

  /*
  |--------------------------------------------------------------------------
  | Global "From" Address
  |--------------------------------------------------------------------------
  |
  | You may wish for all e-mails sent by your application to be sent from
  | the same address. Here, you may specify a name and address that is
  | used globally for all e-mails that are sent by your application.
  |
  */

  from: {
    address: env("MAIL_FROM_ADDRESS", "hello@example.com"),
    name: env("MAIL_FROM_NAME", "Example"),
  },
} satisfies MailConfig;
