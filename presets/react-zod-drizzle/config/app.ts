import AppServiceProvider from "../app/Providers/AppServiceProvider";
import ExceptionServiceProvider from "../app/Providers/ExceptionServiceProvider";
import RouteServiceProvider from "../app/Providers/RouteServiceProvider";
import { FilesystemServiceProvider } from "@lunoxjs/filesystem";
import { EncryptionServiceProvider } from "@lunoxjs/core";
import { ValidationServiceProvider } from "@lunoxjs/zod";
import type { AppConfig } from "@lunoxjs/core/contracts";
import { ViewServiceProvider } from "@lunoxjs/view";
import { DatabaseServiceProvider } from "@lunoxjs/drizzle";
import { AuthServiceProvider } from "@lunoxjs/auth";
import { SessionServiceProvider } from "@lunoxjs/session";

const app: AppConfig = {
  name: "Lunox App",
  env: env("APP_ENV", "production"),
  key: env("APP_KEY"),
  cipher: "aes-128-cbc",
  providers: [
    // lunox service providers
    FilesystemServiceProvider,
    EncryptionServiceProvider,
    SessionServiceProvider,
    AuthServiceProvider,
    ValidationServiceProvider,
    ViewServiceProvider,
    DatabaseServiceProvider,

    // app service providers
    AppServiceProvider,
    ExceptionServiceProvider,
    RouteServiceProvider,
  ],
};
export default app;
