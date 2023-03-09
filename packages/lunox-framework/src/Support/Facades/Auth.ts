import type AuthManagerMagic from "../../Auth/AuthManager";
import type { AuthManager } from "../../Auth/AuthManager";
import useFacade from "./useFacade";
import Facade from "./Facade";
import type { StatefulGuard } from "../../Contracts/Auth/StatefulGuard";

class Auth extends Facade {
  public static getFacadeAccessor() {
    return "auth";
  }
}

export default useFacade<typeof AuthManagerMagic & AuthManager & StatefulGuard>(
  Auth
);
