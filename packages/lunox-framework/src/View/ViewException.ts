import RuntimeException from "../Foundation/Exception/RuntimeException";

class ViewException extends RuntimeException {
  constructor(view: string, error: Error) {
    super(`failed to render view [${view}]`);
    this.stack = error.stack;
  }
}

export default ViewException;
