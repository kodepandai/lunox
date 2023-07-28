import TestCase from "../TestCase";
import { describe, expect, it } from "vitest";
import { Mail } from "../../src";
import DummyMail from "../mail/DummyMail";

TestCase.make();

describe("Mail Manager Test", () => {
  it("success: can read mail config", () => {
    const driver = Mail.getDefaultDriver();
    expect(driver).toBe(config("mail.default"));
  });
  it("success: send mail", async () => {
    try {
      await Mail.send(new DummyMail());
    } catch (e) {
      expect(e).toBe(undefined);
    }
  });
});
