import { VerifyCsrfToken as Middleware } from "lunox";
class VerifyCsrfToken extends Middleware {
  protected except = [
    // "/api/*"
  ];
}

export default VerifyCsrfToken;
