import type { AppConfig } from "@lunoxjs/core/contracts";
import { ValidationServiceProvider } from "@lunoxjs/validation";
import { DatabaseServiceProvider } from "../../src";

const app: AppConfig = {
  name: "Lunox App",
  env: "testing",
  key: env("APP_KEY"),
  cipher: "aes-128-cbc",
  providers: [DatabaseServiceProvider, ValidationServiceProvider],
};
export default app;
