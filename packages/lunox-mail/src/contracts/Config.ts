export type SupportedTransport = "smtp" | "ses";
export type MailerConfig<T extends SupportedTransport> = { transport: T } & TransportConfig[T];

export interface TransportConfig {
  smtp: Partial<{
    host: string;
    port: string | number;
    encryption?: "tls";
    username: string;
    password: string;
  }>;
  ses: Partial<{
    apiVersion: string;
    region: string;
  }>;
}

export interface MailConfig {
  default: string;
  mailers: {
    [key: string]: MailerConfig<"smtp"> | MailerConfig<"ses">;
  };
  [key: string]: any;
}
