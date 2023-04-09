import useFacade from "./useFacade";
import Facade from "./Facade";
import Encrypter from "../../Encryption/Encrypter";

class Crypt extends Facade {
  public static getFacadeAccessor() {
    return Encrypter.symbol;
  }
}

export default useFacade<Encrypter>(Crypt);
