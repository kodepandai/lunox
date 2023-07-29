import type { AppConfig } from "@lunoxjs/core/contracts";

const app: AppConfig = {
  name: "Lunox App",
  env: "testing",
  key: env("APP_KEY"),
  cipher: "aes-128-cbc",
  providers: [],
};
export default app;
