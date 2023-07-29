import { Event } from "../../src";
import TestCase from "../TestCase";
import { describe, expect, test } from "vitest";
import DummyEvent from "../app/Events/DummyEvent";
import dayjs from "dayjs";
import DummyListener from "../app/Listeners/DummyListener";
import { DB } from "@lunoxjs/typeorm";
import { IsNull, LessThanOrEqual } from "typeorm";

TestCase.make();
describe("Test Event Lister", async () => {
  test("can get list event listeners", async () => {
    expect(Event.getListener(DummyEvent.key)[0]).toBe(DummyListener);
  });
  test("dispatch event with delay", async () => {
    await DummyEvent.dispatch(
      { foo: "bar" },
      { delay: dayjs().add(6, "minute").toDate() },
    );
    const queueJob = await DB.use(
      (await import("../../src/models/QueueJob")).default,
    ).findOne({
      where: {
        reserved_at: IsNull(),
      },
      order: {
        id: "ASC",
      },
    });
    expect(
      await DB.use((await import("../../src/models/QueueJob")).default).exist({
        where: {
          reserved_at: IsNull(),
          available_at: LessThanOrEqual(new Date()),
        },
      }),
    ).toBe(false);
    expect(
      await DB.use((await import("../../src/models/QueueJob")).default).exist({
        where: {
          reserved_at: IsNull(),
          available_at: LessThanOrEqual(dayjs().add(6, "minute").toDate()),
        },
      }),
    ).toBe(true);
    expect(
      dayjs(queueJob?.available_at).diff(dayjs(queueJob?.created_at), "minute"),
    ).toBe(6);
  });
});
