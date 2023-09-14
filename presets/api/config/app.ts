import AppServiceProvider from "../app/Providers/AppServiceProvider";
import ExceptionServiceProvider from "../app/Providers/ExceptionServiceProvider";
import RouteServiceProvider from "../app/Providers/RouteServiceProvider";
import EventServiceProvider from "../app/Providers/EventServiceProvider";
import { DatabaseServiceProvider } from "@lunoxjs/typeorm";
import { ValidationServiceProvider } from "@lunoxjs/validation";
import { FilesystemServiceProvider } from "@lunoxjs/filesystem";
import { EncryptionServiceProvider } from "@lunoxjs/core";
import type { AppConfig } from "@lunoxjs/core/contracts";
import { MailServiceProvider } from "@lunoxjs/mail";

const app: AppConfig = {
  name: "Lunox App",
  env: env("APP_ENV", "production"),
  key: env("APP_KEY"),
  cipher: "aes-128-cbc",
  providers: [
    // lunox service providers
    FilesystemServiceProvider,
    EncryptionServiceProvider,
    ValidationServiceProvider,
    EventServiceProvider,
    DatabaseServiceProvider,

    // app service providers
    AppServiceProvider,
    ExceptionServiceProvider,
    RouteServiceProvider,
    MailServiceProvider,
  ],
};
export default app;
