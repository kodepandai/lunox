import type { AppConfig } from "@lunoxjs/core/contracts";
import EventServiceProvider from "../app/providers/EventServiceProvider";

const app: AppConfig = {
  name: "Lunox App",
  env: "testing",
  key: env("APP_KEY"),
  cipher: "aes-128-cbc",
  providers: [EventServiceProvider],
};
export default app;
