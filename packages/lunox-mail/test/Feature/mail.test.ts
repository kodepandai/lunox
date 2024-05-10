import TestCase from "../TestCase";
import { describe, expect, it } from "vitest";
import { Mail } from "../../src";
import DummyMail from "../mail/DummyMail";
import { DB } from "@lunoxjs/typeorm";
import { deserialize } from "v8";

TestCase.make();

describe("Mail Manager Test", () => {
  it("success: can read mail config", () => {
    const driver = Mail.getDefaultDriver();
    expect(driver).toBe(config("mail.default"));
  });
  it.skip("success: send mail", async () => {
    try {
      await Mail.send(new DummyMail());
    } catch (e) {
      expect(e).toBe(undefined);
    }
  });

  it("success: send mail using queue", async () => {
    try {
      await Mail.to("dummy2@mail.com").send(new DummyMail(true));
      const queueMail = await DB.query("SELECT * FROM queue_jobs");
      const payload = deserialize(queueMail?.[0].payload);
      console.log({payload})
      expect(payload.args[0].to).toStrictEqual([
        "dummy@mail.com",
        "dummy2@mail.com",
      ]);
      expect(payload.args[0].subject).toBe("Test Email");
      expect(payload.args[0].html).toContain("send dummy queue email");
    } catch (e) {
      expect(e).toBe(undefined);
    }
  });

  it("success: send batch mail using queue", async () => {
    // create array of number from 1 to 10
    const mailContents = Array.from({ length: 100 }, (_, i) => ({
      to: `dummy${i + 1}@mail.com`,
      subject: `Subject ${i + 1}`,
      text: `Hello ${i + 1}`,
    }));
    await DB.query("TRUNCATE queue_jobs");
    await Promise.all(
      mailContents.map((mail) =>
        Mail.send(new DummyMail(true, mail.subject, mail.text, mail.to)),
      ),
    );
    const queueMail = (await DB.query("SELECT * FROM queue_jobs")) as any[];
    const payloads = queueMail.map((row) => deserialize(row.payload));
    expect(payloads.length).toBe(100);

    // make sure all content is correct
    for (const payload of payloads) {
      const recepientIndex = payload.args[0].subject.replace("Subject ", "");
      expect(payload.args[0].to).toStrictEqual([
        `dummy${recepientIndex}@mail.com`,
      ]);
      expect(payload.args[0].subject).toBe(`Subject ${recepientIndex}`);
      expect(payload.args[0].html).toContain(`Hello ${recepientIndex}`);
    }
  });
});
