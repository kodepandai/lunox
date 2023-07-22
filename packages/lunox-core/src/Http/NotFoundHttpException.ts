import HttpException from "./HttpException";

class NotFoundHttpException extends HttpException {
  public constructor(
    message = "",
    previous: Error | null = null,
    headers: Record<string, string> = {},
  ) {
    super(404, message, previous, headers);
  }
}

export default NotFoundHttpException;
