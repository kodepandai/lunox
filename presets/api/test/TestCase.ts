import { Kernel, TestCase as BaseTestCase } from "@lunoxjs/core";
import app from "../bootstrap/app";

class TestCase extends BaseTestCase {
  public createApplication() {
    return app.make<Kernel>("HttpKernel", { app }).start();
  }
}

export default TestCase;
