import { DB } from "@lunoxjs/drizzle";
import TestCase from "../TestCase";
import { describe, test, expect } from "vitest";
import { users } from "../database/drizzleSchema";

TestCase.provider = "drizzle";
TestCase.make();
describe("Auth Session Test", () => {
  test("can run Application", async () => {
    expect(config("app.name")).toBe("@lunoxjs/auth");
    expect(await DB.query.users.findFirst()).toMatchObject({
      email: "user@drizzle.com",
    });
  });
  test("can attempt login via drizzle provider", async () => {
    const res = await agent.post("/drizzle/attempt").send({
      email: "user@drizzle.com",
      password: "password",
    });
    expect(res.body).toMatchObject({
      isAuthenticated: true,
      user: { email: "user@drizzle.com" },
    });
  });
});
