import useFacade from "./useFacade";
import Facade from "./Facade";
import type Application from "../../Foundation/Application";

class App extends Facade {
  public static getFacadeAccessor() {
    return "app";
  }
}

export default useFacade<Application>(App);
