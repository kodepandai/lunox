import { Application } from "lunox";
import TestCase from "../TestCase";

TestCase.make();

describe("Application Testing", () => {
  test("can run application", () => {
    expect(app() instanceof Application).toBe(true);
  });

  test("can read app config", () => {
    expect(config("app.env")).toBe("testing");
  });

  test("can read environtment variable", () => {
    expect(env("APP_KEY")).toBe(process.env.APP_KEY);
  });
});
