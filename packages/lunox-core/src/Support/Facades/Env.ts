import Facade from "./Facade";
import useFacade from "./useFacade";
import type EnvClass from "../Env";
class Env extends Facade {
  public static getFacadeAccessor() {
    return "Env";
  }
}

export default useFacade<EnvClass>(Env);
