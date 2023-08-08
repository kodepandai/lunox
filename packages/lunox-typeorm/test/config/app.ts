import type { AppConfig } from "@lunoxjs/core/contracts";
import { DatabaseServiceProvider } from "../../src";
import AppServiceProvider from "../app/providers/AppServiceProvider";

const app: AppConfig = {
  name: "Lunox App",
  env: "testing",
  key: env("APP_KEY"),
  cipher: "aes-128-cbc",
  providers: [AppServiceProvider, DatabaseServiceProvider],
};
export default app;
