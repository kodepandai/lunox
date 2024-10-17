import { EncryptionServiceProvider } from "../../src";
import type { AppConfig } from "../../src/Contracts/Config";
import CallbackServiceProvider from "../app/Providers/CallbackServiceProvider";
import RouteServiceProvider from "../app/Providers/RouteServiceProvider";
import ScopeServiceProvider from "../app/Providers/ScopeServecProvider";

const app: AppConfig = {
  name: "Lunox App",
  env: "testing",
  key: env("APP_KEY"),
  cipher: "aes-128-cbc",
  providers: [
    CallbackServiceProvider,
    // lunox service providers
    EncryptionServiceProvider,
    // app service providers
    RouteServiceProvider,
    ScopeServiceProvider,
  ],
};
export default app;
