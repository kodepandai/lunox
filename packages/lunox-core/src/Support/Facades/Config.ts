import Facade from "./Facade";
import useFacade from "./useFacade";
import Repository from "../../Config/Repository";
class Config extends Facade {
  public static getFacadeAccessor() {
    return Repository.symbol;
  }
}

export default useFacade<Repository>(Config);
