import type { File } from "formidable";
import path from "path";
import fs from "fs";
class UploadedFile {
  protected file: File;
  constructor(file: File) {
    this.file = file;
  }

  public getOriginalFile() {
    return this.file;
  }

  public path() {
    return this.file.filepath;
  }

  public getSize() {
    return this.file.size;
  }

  public getClientOriginalExtension() {
    return path.extname(this.file.originalFilename || "");
  }

  public getClientOriginalName() {
    return this.file.originalFilename;
  }

  public getClientMimeType() {
    return this.file.mimetype;
  }

  public move(directory: string, name: string | null = null) {
    if (!fs.existsSync(directory)) {
      fs.mkdirSync(directory);
    }
    this.moveFile(this.file, directory, name);
  }

  private moveFile(file: File, directory: string, name: string | null = null) {
    const oldPath = file.filepath;
    const newPath = path.join(directory, name || file.originalFilename || "");
    fs.renameSync(oldPath, newPath);
    fs.chmodSync(newPath, 0o666);
  }
}

export default UploadedFile;
