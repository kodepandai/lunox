import * as _lunoxjs_view from '@lunoxjs/view';
import { ContentConfig, EnvelopeConfig, Addressable, Address, SupportedTransport, MailerConfig } from './contracts/index.js';
import * as nodemailer from 'nodemailer';
import { Transporter } from 'nodemailer';
import * as nodemailer_lib_smtp_transport from 'nodemailer/lib/smtp-transport';
import { Application, ServiceProvider } from '@lunoxjs/core';
import { Class } from '@lunoxjs/core/contracts';
import * as _lunoxjs_core_dist_useFacade_68042972 from '@lunoxjs/core/dist/useFacade-68042972';

declare class Content {
    protected config: ContentConfig;
    constructor(config: ContentConfig);
    hasView(): boolean;
    hasHtml(): boolean;
    getView(): _lunoxjs_view.Factory | undefined;
    getHtml(): string | undefined;
}

declare class Envelope {
    protected addresses: EnvelopeConfig;
    from?: Addressable;
    replyTo?: Addressable;
    to?: Addressable[];
    cc?: Addressable[];
    bcc?: Addressable[];
    constructor(addresses: EnvelopeConfig);
    protected normaliseAddress(address: Addressable | Addressable[]): (string | Address)[];
    addTo(to: Addressable): this;
}

declare abstract class Mailable {
    protected shouldQueue: boolean;
    envelope(): Envelope;
    content(): Content;
    buildContent(): Promise<string>;
    isShouldQueue(): boolean;
}

declare class Mailer {
    driver: string;
    protected transporter: Transporter;
    protected $to?: Addressable;
    constructor(driver: string, transporter: Transporter);
    to(to: Addressable): this;
    send(mailable: Mailable, preview?: boolean): Promise<string | undefined>;
}

declare class MailManager {
    protected app: Application;
    static symbol: symbol;
    protected mailers: Record<string, Mailer>;
    constructor(app: Application);
    protected getConfig(name: string): any;
    protected resolve(name: string): Mailer;
    protected mailer(name?: string): Mailer;
    createMailTransport<T extends SupportedTransport>(config: MailerConfig<T>): nodemailer.Transporter<nodemailer_lib_smtp_transport.SentMessageInfo>;
    getDefaultDriver(): string;
    __get(method: keyof Mailer): any;
}
declare const _default$1: typeof MailManager & Class<Mailer, any[]>;

declare const _default: MailManager & Mailer & typeof _lunoxjs_core_dist_useFacade_68042972.E;

declare class MailServiceProvider extends ServiceProvider {
    register(): Promise<void>;
}

export { Content, Envelope, _default as Mail, _default$1 as MailManager, MailServiceProvider, Mailable };
