import Facade from "./Facade";
import useFacade from "./useFacade";
import RouteClass from "../../Routing/Route";

class Route extends Facade {
  public static getFacadeAccessor() {
    return RouteClass;
  }
}

export default useFacade<RouteClass>(Route);
