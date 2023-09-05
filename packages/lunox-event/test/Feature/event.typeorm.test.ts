import { Event, QueueJobFailedModel, QueueJobModel } from "../../src";
import TestCase from "../TestCase";
import { beforeAll, describe, expect, test } from "vitest";
import DummyEvent from "../app/Events/DummyEvent";
import dayjs from "dayjs";
import DummyListener from "../app/Listeners/DummyListener";
import { DB } from "@lunoxjs/typeorm";
import { IsNull, LessThanOrEqual } from "typeorm";
import { serialize } from "v8";
import { RuntimeException } from "@lunoxjs/core";
import { QueueJob, QueueJobFailed } from "../../src/contracts/model";
import { deserialize } from "v8";

TestCase.make();
describe("General test", () => {
  test("can get list event listeners", async () => {
    expect(Event.getListener(DummyEvent.key)[0]).toBe(DummyListener);
  });
});
describe("Using Sqlite Database", async () => {
  beforeAll(async () => {
    app().config.set("database.defaultConnection", "sqlite");
    await DB.disconnect();
    await DB.connect();
    await DB.use(app<QueueJob>(QueueJobModel)).delete({});
  });
  test("data not truncated on when stored on QueueJobFailed", async () => {
    await DB.use(app<QueueJobFailed>(QueueJobFailedModel)).insert({
      queue: "default",
      payload: serialize({ foo: "bar" }),
      exception: new Error("this is exception", {
        cause: new RuntimeException("this is cause"),
      }).stack,
      failed_at: new Date(),
    });
  });
  test("dispatch event with delay", async () => {
    await DummyEvent.dispatch(
      { foo: "bar" },
      { delay: dayjs().add(6, "minute").toDate() },
    );
    const queueJob = await DB.use(app<QueueJob>(QueueJobModel)).findOne({
      where: {
        reserved_at: IsNull(),
      },
      order: {
        id: "ASC",
      },
    });
    expect(
      await DB.use(app<QueueJob>(QueueJobModel)).exist({
        where: {
          reserved_at: IsNull(),
          available_at: LessThanOrEqual(new Date()),
        },
      }),
    ).toBe(false);
    expect(
      await DB.use(app<QueueJob>(QueueJobModel)).exist({
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

describe("Using Mysql Database", async () => {
  beforeAll(async () => {
    app().config.set("database.defaultConnection", "mysql");
    await DB.disconnect();
    await DB.connect();
    await DB.use(app<QueueJob>(QueueJobModel)).delete({});
  });
  test("data not truncated on when stored on QueueJobFailed", async () => {
    await DB.use(app<QueueJobFailed>(QueueJobFailedModel)).insert({
      queue: "default",
      payload: serialize({ foo: "bar" }),
      exception: new Error("this is exception", {
        cause: new RuntimeException("this is cause"),
      }).stack,
      failed_at: new Date(),
    });
  });
  test("dispatch event with delay", async () => {
    await DummyEvent.dispatch(
      { foo: "bar" },
      { delay: dayjs().add(6, "minute").toDate() },
    );
    const queueJob = await DB.use(app<QueueJob>(QueueJobModel)).findOne({
      where: {
        reserved_at: IsNull(),
      },
      order: {
        id: "ASC",
      },
    });
    expect(
      await DB.use(app<QueueJob>(QueueJobModel)).exist({
        where: {
          reserved_at: IsNull(),
          available_at: LessThanOrEqual(new Date()),
        },
      }),
    ).toBe(false);
    expect(
      await DB.use(app<QueueJob>(QueueJobModel)).exist({
        where: {
          reserved_at: IsNull(),
          available_at: LessThanOrEqual(dayjs().add(6, "minute").toDate()),
        },
      }),
    ).toBe(true);
    expect(
      Math.round(
        dayjs(queueJob?.available_at).diff(
          dayjs(queueJob?.created_at),
          "second",
        ) / 60,
      ),
    ).toBe(6);
  });
});
describe("Using Postgres Database", async () => {
  beforeAll(async () => {
    app().config.set("database.defaultConnection", "postgres");
    await DB.disconnect();
    await DB.connect();
    await DB.use(app<QueueJob>(QueueJobModel)).delete({});
  });
  test("data not truncated on when stored on QueueJobFailed", async () => {
    await DB.use(app<QueueJobFailed>(QueueJobFailedModel)).insert({
      queue: "default",
      payload: serialize({ foo: "bar" }),
      exception: new Error("this is exception", {
        cause: new RuntimeException("this is cause"),
      }).stack,
      failed_at: new Date(),
    });
  });
  test("dispatch event with delay", async () => {
    await DummyEvent.dispatch(
      { foo: "bar" },
      { delay: dayjs().add(6, "minute").toDate() },
    );
    const queueJob = await DB.use(app<QueueJob>(QueueJobModel)).findOne({
      where: {
        reserved_at: IsNull(),
      },
      order: {
        id: "ASC",
      },
    });
    expect(
      await DB.use(app<QueueJob>(QueueJobModel)).exist({
        where: {
          reserved_at: IsNull(),
          available_at: LessThanOrEqual(new Date()),
        },
      }),
    ).toBe(false);
    expect(
      await DB.use(app<QueueJob>(QueueJobModel)).exist({
        where: {
          reserved_at: IsNull(),
          available_at: LessThanOrEqual(dayjs().add(6, "minute").toDate()),
        },
      }),
    ).toBe(true);
    expect(
      Math.round(
        dayjs(queueJob?.available_at).diff(
          dayjs(queueJob?.created_at),
          "second",
        ) / 60,
      ),
    ).toBe(6);
  });
});
