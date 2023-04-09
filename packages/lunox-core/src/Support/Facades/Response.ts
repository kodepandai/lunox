import ResponseFactory from "../../Routing/ResponseFactory";
import Facade from "./Facade";
import useFacade from "./useFacade";

class Response extends Facade {
  public static getFacadeAccessor() {
    return ResponseFactory.symbol;
  }
}

export default useFacade<ResponseFactory>(Response);
