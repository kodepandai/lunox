import useFacade from "./useFacade";
import Facade from "./Facade";
import type Encrypter from "../../Encryption/Encrypter";

class Crypt extends Facade {
  public static getFacadeAccessor() {
    return "encrypter";
  }
}

export default useFacade<Encrypter>(Crypt);
