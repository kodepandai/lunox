import { describe, test, expect } from "vitest";
import TestCase from "../TestCase";
import { Route } from "../../src/Support/Facades";

TestCase.make();

describe("Router Testing", () => {
  test("can access web routes", async () => {
    console.log(Route.test);
    const res = await agent.get("/home");
    expect(res.text).toMatch("welcome to home");
  });

  test("can access api routes", async () => {
    const res = await agent.get("/api");
    expect(res.body).toMatchObject({
      success: true,
      message: "OK",
    });
  });
  test("can access post routes", async () => {
    const res = await agent.post("/api");
    expect(res.text).toBe("halo");
  });
});
