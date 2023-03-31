import Storage from "../Support/Facades/Storage";
import ServiceProvider from "../Support/ServiceProvider";
import FilesystemManager from "./FilesystemManager";

class FilesystemServiceProvider extends ServiceProvider {
  async register() {
    this.app.singleton("filesystem", () => new FilesystemManager(this.app));
  }

  async boot() {
    if (Storage.isUsingS3()) {
      Storage.registerS3Driver();
    }
  }
}

export default FilesystemServiceProvider;
