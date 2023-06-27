import Storage from "./facades/Storage";
import { ServiceProvider } from "@lunoxjs/core";
import FilesystemManager from "./FilesystemManager";

class FilesystemServiceProvider extends ServiceProvider {
  async register() {
    this.app.singleton(
      FilesystemManager.symbol,
      () => new FilesystemManager(this.app)
    );
  }

  async boot() {
    if (Storage.isUsingS3()) {
      Storage.registerS3Driver();
    }
  }
}

export default FilesystemServiceProvider;
