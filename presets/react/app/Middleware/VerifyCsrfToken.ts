import { VerifyCsrfToken as Middleware } from "@lunoxjs/core";
class VerifyCsrfToken extends Middleware {
  protected except = [
    // "/api/*"
  ];
}

export default VerifyCsrfToken;
