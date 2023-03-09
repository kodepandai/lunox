import type { File } from "formidable";
import path from "path";
import fs from "fs";
class UploadedFile {
  protected file: File | File[];
  constructor(file: File | File[]) {
    this.file = file;
  }

  public path() {
    this.failIfArray("path");
    return (this.file as File).filepath;
  }

  public getClientOriginalExtension() {
    this.failIfArray("getClientOriginalExtension");
    return path.extname((this.file as File).originalFilename || "");
  }

  public getClientOriginalName() {
    this.failIfArray("getClientOriginalName");
    return (this.file as File).originalFilename;
  }

  public getClientMimeType() {
    this.failIfArray("getClientMimeType");
    return (this.file as File).mimetype;
  }

  public move(directory: string, name: string | null = null) {
    if (!fs.existsSync(directory)) {
      fs.mkdirSync(directory);
    }
    if (Array.isArray(this.file)) {
      this.file.forEach((file) => {
        this.moveFile(file, directory, name);
      });
    } else {
      this.moveFile(this.file, directory, name);
    }
  }

  private failIfArray(method: string) {
    if (Array.isArray(this.file)) {
      throw new Error(`Cannot call method '${method}' on Array`);
    }
  }

  private moveFile(file: File, directory: string, name: string | null = null) {
    const oldPath = file.filepath;
    const newPath = path.join(directory, name || file.originalFilename || "");
    fs.renameSync(oldPath, newPath);
    fs.chmodSync(newPath, 0o666);
  }
}

export default UploadedFile;
