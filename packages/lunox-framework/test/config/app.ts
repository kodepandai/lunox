import {
  FilesystemServiceProvider,
  ValidationServiceProvider,
  DatabaseServiceProvider,
  ViewServiceProvider,
  SessionServiceProvider,
  AuthServiceProvider,
  EncryptionServiceProvider,
} from "../../src";
import type { AppConfig } from "../../src/Contracts/Config";
import RouteServiceProvider from "../app/Providers/RouteServiceProvider";

const app: AppConfig = {
  name: "Lunox App",
  env: "testing",
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
    RouteServiceProvider,
  ],
};
export default app;
