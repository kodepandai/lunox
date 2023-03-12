import { EncryptCookie as Middleware } from "lunox";
class EncryptCookie extends Middleware {
  protected except = [];
}

export default EncryptCookie;
