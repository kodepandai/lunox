import Response from "../Http/Response";
import type { ObjectOf } from "../Types";

class ResponseFactory {
  public static symbol = Symbol("ResponseFactory");
  constructor() {}
  make(content: any = "", status = 200, headers: ObjectOf<string> = {}) {
    return new Response(content, status, headers);
  }
}

export default ResponseFactory;
