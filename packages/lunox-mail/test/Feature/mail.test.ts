import TestCase from "../TestCase";
import { describe, expect, it } from "vitest";
import { Mail } from "../../src";

TestCase.make();

describe("Mail Manager Test", () => {
  it("success: can read mail config", () => {
    const driver = Mail.getDefaultDriver();
    expect(driver).toBe(config("mail.default"));
  });
});
