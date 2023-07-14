import { Facade, useFacade } from "@lunoxjs/core/facades";
import Factory from "../Factory";

class View extends Facade {
  public static getFacadeAccessor() {
    return Factory.symbol;
  }
}

export default useFacade<Factory>(View);
