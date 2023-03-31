import type Factory from "../../Validation/Factory";
import Facade from "./Facade";
import useFacade from "./useFacade";

class Validator extends Facade {
  public static getFacadeAccessor() {
    return "validator";
  }
}

export default useFacade<Factory>(Validator);
