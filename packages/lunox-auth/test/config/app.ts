import type { AppConfig } from "@lunoxjs/core/contracts";
import { DatabaseServiceProvider as TypeormServiceProvider } from "@lunoxjs/typeorm";
import { DatabaseServiceProvider as EloquentServiceProvider } from "@lunoxjs/eloquent";
import { DatabaseServiceProvider as DrizzleServiceProvider } from "@lunoxjs/drizzle";
import AppServiceProvider from "../app/providers/AppServiceProvider";
import { AuthServiceProvider } from "../../src";
import { SessionServiceProvider } from "@lunoxjs/session";
import { EncryptionServiceProvider } from "@lunoxjs/core";

const app: AppConfig = {
  name: "@lunoxjs/auth",
  env: "testing",
  key: env("APP_KEY", "base64:kVbcYzDOdPx9qcBdVQma4g=="),
  cipher: "aes-128-cbc",
  providers: [
    SessionServiceProvider,
    EncryptionServiceProvider,
    TypeormServiceProvider,
    EloquentServiceProvider,
    DrizzleServiceProvider,
    AppServiceProvider,
    AuthServiceProvider,
  ],
};
export default app;
