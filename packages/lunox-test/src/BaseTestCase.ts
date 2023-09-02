import type { Application } from "@lunoxjs/core";
import type { Server } from "@lunoxjs/core/contracts";
import { afterAll, beforeAll } from "vitest";

abstract class BaseTestCase {
  protected app!: Application;

  public static make<T extends BaseTestCase>(this: new () => T) {
    const test = new this();
    beforeAll(async () => {
      await test.setUp();
      test.app.config.set("app.env", "testing");
      const { agent } = await import("supertest");
      global.agent = agent(test.app.make<Server>("server").handler);
    });

    afterAll(() => {
      return test.tearDown();
    });

    return test;
  }
  /**
   * Setup the test environment
   */
  protected async setUp() {
    if (!this.app) {
      return await this.refreshApplication();
    }
  }

  /**
   * Refresh the application instance
   */
  protected async refreshApplication() {
    try {
      this.app = await this.createApplication();
    } catch (error) {
      console.log("fail to create application", error);
    }
  }

  public abstract createApplication(): Promise<Application>;

  /**
   * Clean up the test environtment before next test.
   */
  protected tearDown() {
    // pass
  }
}

export default BaseTestCase;
