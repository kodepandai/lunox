import TestCase from "../TestCase";
import { describe, test, expect } from "vitest";
import User from "../app/Model/typeorm/User";
import { DB } from "@lunoxjs/typeorm";

TestCase.provider = "typeorm";
TestCase.make();
describe("Auth Session Test", () => {
  test("can run Application", async () => {
    expect(config("app.name")).toBe("@lunoxjs/auth");
    expect(await DB.use(User).findOne({where: { email: "user@typeorm.com" }})).toMatchObject({
      email: "user@typeorm.com",
    });
  });
  test("can attempt login via typeorm provider", async () => {
    const res = await agent.post("/typeorm/attempt").send({
      email: "user@typeorm.com",
      password: "password",
    });
    expect(res.body).toMatchObject({
      isAuthenticated: true,
      user: { email: "user@typeorm.com" },
    });
  });
});
