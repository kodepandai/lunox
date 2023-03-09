import type Factory from "../../View/Factory";
import Facade from "./Facade";
import useFacade from "./useFacade";

class View extends Facade {
  public static getFacadeAccessor() {
    return "view";
  }
}

export default useFacade<Factory>(View);
