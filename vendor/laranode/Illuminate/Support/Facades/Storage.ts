import type FilesystemManager from "../../Filesystem/FilesystemManager";
import Facade from "./Facade";
import useFacade from "./useFacade";

class Storage extends Facade {
  public static getFacadeAccessor() {
    return "filesystem";
  }
}

export default useFacade<FilesystemManager>(Storage);
