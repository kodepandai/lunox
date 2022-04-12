import AppServiceProvider from "app/Providers/AppServiceProvider";
import ExceptionServiceProvider from "app/Providers/ExceptionServiceProvider";
import RouteServiceProvider from "app/Providers/RouteServiceProvider";
import {
  FilesystemServiceProvider,
  ValidationServiceProvider,
  DatabaseServiceProvider,
  ViewServiceProvider,
  SessionServiceProvider,
  AuthServiceProvider,
  EncryptionServiceProvider,
} from "lunox";
import type { AppConfig } from "lunox/dist/Contracts/Config";

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
    ViewServiceProvider,

    // app service providers
    AppServiceProvider,
    ExceptionServiceProvider,
    RouteServiceProvider,
  ],
};
export default app;
