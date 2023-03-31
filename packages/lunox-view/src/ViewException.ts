import { RuntimeException } from "@lunoxjs/core";

class ViewException extends RuntimeException {
  constructor(view: string, error: Error) {
    super(`failed to render view [${view}]`);
    this.stack = error.stack;
  }
}

export default ViewException;
