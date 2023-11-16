import { describe, test, expect } from "vitest";
import TestCase from "../TestCase";

TestCase.make();

describe("Formdata Testing", () => {
  test("can parse form data", async () => {
    const res = await agent
      .post("/api/upload")
      .type("form")
      .field("foo", "bar")
      .attach("file", "./package.json")
      .attach("file", "./package.json");
    expect(JSON.parse(res.body.file).name).toBe("@lunoxjs/core");
    expect(JSON.parse(res.body.files).name).toBe("@lunoxjs/core");
    expect(res.body.count).toBe(2);
  });

  test("can parse form data with []", async () => {
    const res = await agent
      .post("/api/upload")
      .type("form")
      .field("foo", "bar")
      .attach("file[]", "./package.json")
      .attach("file[]", "./package.json");
    expect(JSON.parse(res.body.file).name).toBe("@lunoxjs/core");
    expect(JSON.parse(res.body.files).name).toBe("@lunoxjs/core");
    expect(res.body.count).toBe(2);
  });
});
