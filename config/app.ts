import ExceptionServiceProvider from "app/Providers/ExceptionServiceProvider";
import RouteServiceProvider from "app/Providers/RouteServiceProvider";
import {
  FilesystemServiceProvider,
  ValidationServiceProvider,
  DatabaseServiceProvider,
  ViewServiceProvider,
  SessionServiceProvider,
  AuthServiceProvider,
} from "lunox";

export default {
  name: "Lunox App",
  providers: [
    // lunox service providers
    FilesystemServiceProvider,
    DatabaseServiceProvider,
    SessionServiceProvider,
    AuthServiceProvider,
    ValidationServiceProvider,
    ViewServiceProvider,

    // app service providers
    ExceptionServiceProvider,
    RouteServiceProvider,
  ],
};
