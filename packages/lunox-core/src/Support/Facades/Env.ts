import Facade from "./Facade";
import useFacade from "./useFacade";
import EnvClass from "../Env";
class Env extends Facade {
  public static getFacadeAccessor() {
    return EnvClass.symbol;
  }
}

export default useFacade<EnvClass>(Env);
