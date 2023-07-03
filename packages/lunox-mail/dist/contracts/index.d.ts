import { Factory } from '@lunoxjs/view';

type Addressable = string | Address;
interface Address {
    name: string;
    address: string;
}
interface EnvelopeConfig {
    from?: Addressable;
    to?: Addressable | Addressable[];
    cc?: Addressable | Addressable[];
    bcc?: Addressable | Addressable[];
    replyTo?: Addressable;
    subject: string;
}
interface ContentConfig {
    view?: Factory;
    html?: string;
}

type SupportedTransport = "smtp" | "ses";
type MailerConfig<T extends SupportedTransport> = {
    transport: T;
} & TransportConfig[T];
interface TransportConfig {
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
interface MailConfig {
    default: string;
    mailers: {
        [key: string]: MailerConfig<"smtp"> | MailerConfig<"ses">;
    };
    [key: string]: any;
}

export { Address, Addressable, ContentConfig, EnvelopeConfig, MailConfig, MailerConfig, SupportedTransport, TransportConfig };
