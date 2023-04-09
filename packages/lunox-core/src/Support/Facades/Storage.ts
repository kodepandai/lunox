import FilesystemManager from "../../Filesystem/FilesystemManager";
import Facade from "./Facade";
import useFacade from "./useFacade";

class Storage extends Facade {
  public static getFacadeAccessor() {
    return FilesystemManager.symbol;
  }
}

export default useFacade<FilesystemManager>(Storage);
