import type { Request as ServerRequest } from "polka";
import type { ObjectOf } from "../Types";
import type UploadedFile from "./UploadedFile";

class Request {
  public files: ObjectOf<UploadedFile> = {};

  protected req: ServerRequest;

  protected data: ObjectOf<any>;

  constructor(req: ServerRequest) {
    this.req = req;
    const query = typeof req.query == "object" ? req.query : {};
    this.data = { ...query, ...req.body };
  }

  public get(key: string) {
    return this.data[key] || null;
  }

  public all(): any {
    return this.data;
  }

  public allFiles(): ObjectOf<UploadedFile> {
    return this.files;
  }

  public file(key: string) {
    return this.files[key] || null;
  }

  public merge(newData: ObjectOf<any>) {
    this.data = { ...this.data, ...newData };
    return this;
  }

  public getOriginalRequest() {
    return this.req;
  }

  public instance() {
    return this;
  }
}

export default Request;
