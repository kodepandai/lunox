import AppServiceProvider from "../app/Providers/AppServiceProvider";
import ExceptionServiceProvider from "../app/Providers/ExceptionServiceProvider";
import RouteServiceProvider from "../app/Providers/RouteServiceProvider";
import {
  FilesystemServiceProvider,
  ValidationServiceProvider,
  DatabaseServiceProvider,
  SessionServiceProvider,
  AuthServiceProvider,
  EncryptionServiceProvider,
} from "@lunoxjs/core";
import type { AppConfig } from "@lunoxjs/core";

const app: AppConfig = {
  name: "Lunox App",
  env: env("APP_ENV", "production"),
  key: env("APP_KEY"),
  cipher: "aes-128-cbc",
  providers: [
    // lunox service providers
    FilesystemServiceProvider,
    DatabaseServiceProvider,
    EncryptionServiceProvider,
    SessionServiceProvider,
    AuthServiceProvider,
    ValidationServiceProvider,

    // app service providers
    AppServiceProvider,
    ExceptionServiceProvider,
    RouteServiceProvider,
  ],
};
export default app;
