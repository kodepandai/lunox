import type { AppConfig } from "@lunoxjs/core/contracts";
import { ValidationServiceProvider } from "../../src";

const app: AppConfig = {
  name: "Lunox App",
  env: "testing",
  key: env("APP_KEY"),
  cipher: "aes-128-cbc",
  providers: [ValidationServiceProvider],
};
export default app;
