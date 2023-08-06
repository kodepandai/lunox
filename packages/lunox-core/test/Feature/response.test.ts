import { describe, test, expect } from "vitest";
import TestCase from "../TestCase";

TestCase.make();

describe("Response Test", () => {
  test("response().json() should return json)", async () => {
    const res = await agent.get("/json");
    expect(res.type).toBe("application/json");
  });
  test("response() without explicit json will infer type automatically", async () => {
    const resText = await agent.get("/response-text");
    expect(resText.type).toBe("text/html");
    const resObject = await agent.get("/response-object");
    expect(resObject.type).toBe("application/json");
  });
  test("response().download() should work", async () => {
    const res = await agent.get("/download");
    expect(res.type).toBe("text/html");
    console.log(res.header);
  });
});
