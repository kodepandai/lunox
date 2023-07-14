import FilesystemManager from "../FilesystemManager";
import { useFacade, Facade } from "@lunoxjs/core/facades";

class Storage extends Facade {
  public static getFacadeAccessor() {
    return FilesystemManager.symbol;
  }
}

export default useFacade<FilesystemManager>(Storage);
