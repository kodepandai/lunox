import Response from "../Http/Response";

class ResponseFactory {
  public static symbol = Symbol("ResponseFactory");
  constructor() { }
  make(content: any = "", status = 200, headers: Record<string, string> = {}) {
    return new Response(content, status, headers);
  }
}

export default ResponseFactory;
