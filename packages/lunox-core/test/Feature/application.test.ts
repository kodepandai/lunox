import { Application } from "../../src";
import TestCase from "../TestCase";

TestCase.make();

describe("Application Testing", () => {
  test("can run application", async () => {
    expect(app() instanceof Application).toBe(true);
  });
});
