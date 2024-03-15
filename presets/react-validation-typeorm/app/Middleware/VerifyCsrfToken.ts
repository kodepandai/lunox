import { VerifyCsrfToken as Middleware } from "@lunoxjs/session";
class VerifyCsrfToken extends Middleware {
  protected except = [
    // "/api/*"
  ];
}

export default VerifyCsrfToken;
