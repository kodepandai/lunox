import useFacade from "./useFacade";
import Facade from "./Facade";

class Store extends Facade {
  public static getFacadeAccessor() {
    return "AsyncLocalStorage.store";
  }
}

export default useFacade<Map<string | symbol, any>>(Store);
