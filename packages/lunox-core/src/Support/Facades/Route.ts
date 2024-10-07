import Facade from "./Facade";
import useFacade from "./useFacade";
import { Router } from "../../Routing/Router";

class Route extends Facade {
  public static getFacadeAccessor() {
    return Router.symbol;
  }
}

export default useFacade<Router>(Route);
