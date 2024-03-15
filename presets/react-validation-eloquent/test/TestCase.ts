import { Kernel } from "@lunoxjs/core";
import { BaseTestCase } from "@lunoxjs/test";
import app from "../app";

class TestCase extends BaseTestCase {
  public createApplication() {
    return app.make<Kernel>("HttpKernel", { app }).start();
  }
}

export default TestCase;
