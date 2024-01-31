import TestCase from "../TestCase";
import { describe, test, expect } from "vitest";
import User from "../app/Model/eloquent/User";

TestCase.provider = "eloquent";
TestCase.make();
describe("Auth Session Test", () => {
  test("can run Application", async () => {
    expect(config("app.name")).toBe("@lunoxjs/auth");
    expect(await User.query().first()).toMatchObject({
      email: "user@eloquent.com",
    });
  });
  test("can attempt login via eloquent provider", async () => {
    const res = await agent.post("/eloquent/attempt").send({
      email: "user@eloquent.com",
      password: "password",
    });
    expect(res.body).toMatchObject({
      isAuthenticated: true,
      user: { email: "user@eloquent.com" },
    });
  });
});
