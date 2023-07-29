import type { AppConfig } from "@lunoxjs/core/contracts";
import { EventServiceProvider } from "@lunoxjs/event";
import { DatabaseServiceProvider } from "@lunoxjs/typeorm";
import { MailServiceProvider } from "../../src";

const app: AppConfig = {
  name: "Lunox App",
  env: "testing",
  key: env("APP_KEY"),
  cipher: "aes-128-cbc",
  providers: [
    DatabaseServiceProvider,
    EventServiceProvider,
    MailServiceProvider,
  ],
};
export default app;
