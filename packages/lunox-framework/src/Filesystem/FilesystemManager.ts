import type Application from "../Foundation/Application";
import { StorageManager } from "@kodepandai/flydrive";

class FilesystemManager extends StorageManager {
  protected app: Application;

  constructor(app: Application) {
    super(config("filesystems"));
    this.app = app;
  }

  public isUsingS3() {
    const disks = config("filesystems").disks;
    for (const disk in disks) {
      if (disks[disk].driver == "s3") return true;
    }
    return false;
  }

  public async registerS3Driver() {
    this.registerDriver(
      "s3",
      (await import("@kodepandai/flydrive-s3")).AmazonWebServicesS3Storage
    );
  }
}

export default FilesystemManager;
