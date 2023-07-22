import type { HttpExceptionInterface } from "../Contracts/Exception/HttpExceptionInterface";

class HttpException extends Error implements HttpExceptionInterface {
  private statusCode: number;
  private headers: Record<string, string>;
  private previous: Error | null;

  public constructor(
    statusCode: number,
    message = "",
    previous: Error | null = null,
    headers: Record<string, string> = {},
  ) {
    super(message);
    this.previous = previous;
    this.statusCode = statusCode;
    this.headers = headers;
  }
  public getStatusCode(): number {
    return this.statusCode;
  }
  public getHeaders(): Record<string, string> {
    return this.headers;
  }

  public getPrevious(): Error | null {
    return this.previous;
  }
}

export default HttpException;
