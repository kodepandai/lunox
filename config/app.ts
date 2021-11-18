import ValidationServiceProvider from "../vendor/laranode/Illuminate/Validation/ValidationServiceProvider";
import RouteServiceProvider from "../app/Providers/RouteServiceProvider";

export default {
  name: "LaraNode",
  providers: [RouteServiceProvider, ValidationServiceProvider],
};
