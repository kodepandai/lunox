import useFacade from "./useFacade";
import Facade from "./Facade";
import { AsyncLocalStorage } from "async_hooks";

class Als extends Facade {
  public static getFacadeAccessor() {
    return AsyncLocalStorage;
  }
}

export default useFacade<AsyncLocalStorage<Map<string | symbol, any>>>(Als);
