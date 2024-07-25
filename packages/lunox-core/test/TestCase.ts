import app from "./bootstrap/app";
import BaseTestCase from "../../lunox-test/src/BaseTestCase";
import type { Kernel } from "../src";

class TestCase extends BaseTestCase {
  public createApplication() {
    return app.make<Kernel>("HttpKernel", { app }).start() as any;
  }

  protected async setUp() {
    if (!this.app) {
      await this.refreshApplication();
    }
  }
}

export default TestCase;
