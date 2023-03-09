import { DB } from "../Database";
import type { Application } from "../Foundation";
import type { Polka } from "polka";

abstract class TestCase {
  protected app!: Application;

  public static make<T extends TestCase>(this: new () => T) {
    const test = new this();
    beforeAll(async () => {
      await test.setUp();
      const { agent } = await import("supertest");
      global.agent = agent(test.app.make<Polka>("server").handler);
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
    // Closing the DB connection allows Jest to exit successfully.
    return DB.getDb()?.destroy();
  }
}

export default TestCase;
