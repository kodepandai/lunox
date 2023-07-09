import { describe, test, expect } from "vitest";
import TestCase from "../TestCase";

TestCase.make();

describe("Request Test", () => {
  test("access request-1 should return empty object", async () => {
    const res = await agent.get("/api/request-1");
    expect(res.body).toMatchObject({});
  });

  test("access request-1 paralel with request-2 should not conflict", async () => {
    const responses = await Promise.all([
      agent.get("/api/request-1"),
      agent.get("/api/request-2"),
    ]);
    expect(responses[0].body).toMatchObject({});
    expect(responses[1].body).toMatchObject({ foo: "bar" });
  });
});
