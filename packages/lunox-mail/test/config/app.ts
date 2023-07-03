import type { AppConfig } from "@lunoxjs/core/contracts";
import { MailServiceProvider } from "../../src";

const app: AppConfig = {
  name: "Lunox App",
  env: "testing",
  key: env("APP_KEY"),
  cipher: "aes-128-cbc",
  providers: [MailServiceProvider],
};
export default app;
