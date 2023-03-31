import Facade from "./Facade";
import useFacade from "./useFacade";
import type Repository from "../../Config/Repository";
class Config extends Facade {
  public static getFacadeAccessor() {
    return "config";
  }
}

export default useFacade<Repository>(Config);
