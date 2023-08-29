import type { AppConfig } from "@lunoxjs/core/contracts";
import { EventServiceProvider } from "@lunoxjs/event";
import { DatabaseServiceProvider } from "@lunoxjs/typeorm";
import { MailServiceProvider } from "../../src";
import { ViewServiceProvider } from "@lunoxjs/view";

const app: AppConfig = {
  name: "Lunox App",
  env: "testing",
  key: env("APP_KEY"),
  cipher: "aes-128-cbc",
  providers: [
    DatabaseServiceProvider,
    EventServiceProvider,
    MailServiceProvider,
    ViewServiceProvider,
  ],
};
export default app;
