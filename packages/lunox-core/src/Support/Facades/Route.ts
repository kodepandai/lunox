import Facade from "./Facade";
import useFacade from "./useFacade";
import RouterClass, { Router } from "../../Routing/Router";

class Route extends Facade {
  public static getFacadeAccessor() {
    return RouterClass;
  }
}

export default useFacade<Router>(Route);
