import type { ObjectOf } from "../Types";

class Response {
  protected original: any;
  protected status: number;
  protected headers: ObjectOf<string>;
  constructor(content: any, status = 200, headers: ObjectOf<string> = {}) {
    this.original = content;
    this.status = status;
    this.headers = headers;
  }

  getOriginal() {
    return this.original;
  }
  getStatus() {
    return this.status;
  }
  getHeaders() {
    return this.headers;
  }
}

export default Response;
