import ExceptionServiceProvider from "app/Providers/ExceptionServiceProvider";
import RouteServiceProvider from "app/Providers/RouteServiceProvider";
import { FilesystemServiceProvider, ValidationServiceProvider } from "lunox";

export default {
  name: "Lunox App",
  providers: [
    // lunox service providers
    FilesystemServiceProvider,
    ValidationServiceProvider,

    // app service providers
    ExceptionServiceProvider,
    RouteServiceProvider,
  ],
};
