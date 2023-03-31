import type { ObjectOf } from "../Types";
import type { HttpExceptionInterface } from "../Contracts/Exception/HttpExceptionInterface";

class HttpException extends Error implements HttpExceptionInterface {
  private statusCode: number;
  private headers: ObjectOf<string>;
  private previous: Error | null;

  public constructor(
    statusCode: number,
    message = "",
    previous: Error | null = null,
    headers: ObjectOf<string> = {}
  ) {
    super(message);
    this.previous = previous;
    this.statusCode = statusCode;
    this.headers = headers;
  }
  public getStatusCode(): number {
    return this.statusCode;
  }
  public getHeaders(): ObjectOf<string> {
    return this.headers;
  }

  public getPrevious(): Error | null {
    return this.previous;
  }
}

export default HttpException;
