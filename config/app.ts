import ExceptionServiceProvider from "app/Providers/ExceptionServiceProvider";
import RouteServiceProvider from "app/Providers/RouteServiceProvider";
import {
  FilesystemServiceProvider,
  ValidationServiceProvider,
  DatabaseServiceProvider,
  ViewServiceProvider,
  SessionServiceProvider,
} from "lunox";

export default {
  name: "Lunox App",
  providers: [
    // lunox service providers
    FilesystemServiceProvider,
    DatabaseServiceProvider,
    SessionServiceProvider,
    ValidationServiceProvider,
    ViewServiceProvider,

    // app service providers
    ExceptionServiceProvider,
    RouteServiceProvider,
  ],
};
