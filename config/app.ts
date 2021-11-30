import ValidationServiceProvider from "../vendor/laranode/Illuminate/Validation/ValidationServiceProvider";
import RouteServiceProvider from "../app/Providers/RouteServiceProvider";
import FilesystemServiceProvider from "vendor/laranode/Illuminate/Filesystem/FilesystemServiceProvider";

export default {
  name: "LaraNode",
  providers: [
    FilesystemServiceProvider,
    RouteServiceProvider,
    ValidationServiceProvider,
  ],
};
