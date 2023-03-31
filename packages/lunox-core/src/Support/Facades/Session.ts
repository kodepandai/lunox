import useFacade from "./useFacade";
import Facade from "./Facade";
import type SessionManager from "../../Session/SessionManager";

class Session extends Facade {
  public static getFacadeAccessor() {
    return "session";
  }
}

export default useFacade<SessionManager>(Session);
