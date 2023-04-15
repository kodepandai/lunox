import { Facade, useFacade } from "@lunoxjs/core";
import Factory from "../Factory";

class Validator extends Facade {
  public static getFacadeAccessor() {
    return Factory.symbol;
  }
}

export default useFacade<Factory>(Validator);
