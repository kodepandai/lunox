import { Facade, useFacade } from "@lunoxjs/core";
import type Factory from "../Factory";

class View extends Facade {
  public static getFacadeAccessor() {
    return "view";
  }
}

export default useFacade<Factory>(View);
