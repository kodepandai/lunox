import { EncryptCookie as Middleware } from "@lunoxjs/core";
class EncryptCookie extends Middleware {
  protected except = [];
}

export default EncryptCookie;
