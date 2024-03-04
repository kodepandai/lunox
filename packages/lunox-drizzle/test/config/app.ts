import type { AppConfig } from "@lunoxjs/core/contracts";
import DatabaseServiceProvider from "../../src/DatabaseServiceProvider";

const app: AppConfig = {
  name: "Lunox App",
  env: "testing",
  key: env("APP_KEY"),
  cipher: "aes-128-cbc",
  providers: [DatabaseServiceProvider],
};
export default app;
