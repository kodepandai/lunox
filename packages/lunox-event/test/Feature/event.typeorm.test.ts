import { Event, Queue } from "../../src";
import TestCase from "../TestCase";
import { beforeAll, describe, expect, test } from "vitest";
import DummyEvent from "../app/Events/DummyEvent";
import dayjs from "dayjs";
import DummyListener from "../app/Listeners/DummyListener";
import { DB } from "@lunoxjs/typeorm";
import { IsNull, LessThanOrEqual } from "typeorm";
import { serialize } from "v8";
import { RuntimeException } from "@lunoxjs/core";
import { QueueJob as QueueJobMysql } from "@lunoxjs/event-typeorm/mysql";
import { QueueJob as QueueJobSqlite } from "@lunoxjs/event-typeorm/sqlite";
import { QueueJob as QueueJobPg } from "@lunoxjs/event-typeorm/postgre";
import { QueueJobFailed as QueueJobFailedMysql } from "@lunoxjs/event-typeorm/mysql";
import { QueueJobFailed as QueueJobFailedSqlite } from "@lunoxjs/event-typeorm/sqlite";
import { QueueJobFailed as QueueJobFailedPg } from "@lunoxjs/event-typeorm/postgre";

TestCase.make();
describe("General test", () => {
  test("can get list event listeners", async () => {
    expect(Event.getListener(DummyEvent.key)[0]).toBe(DummyListener);
  });
});
describe("Using Sqlite Database", async () => {
  beforeAll(async () => {
    app().config.set("database.defaultConnection", "sqlite");
    app().config.set("queue.defaultConnection", "sqlite");
    await DB.disconnect();
    await DB.connect();
    await DB.use(QueueJobSqlite).delete({});
    await DB.use(QueueJobFailedSqlite).delete({});
  });
  test("data not truncated on when stored on QueueJobFailed", async () => {
    await DB.use(QueueJobFailedSqlite).insert({
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
    const queueJob = await DB.use(QueueJobSqlite).findOne({
      where: {
        reserved_at: IsNull(),
      },
      order: {
        id: "ASC",
      },
    });
    expect(
      await DB.use(QueueJobSqlite).exist({
        where: {
          reserved_at: IsNull(),
          available_at: LessThanOrEqual(new Date()),
        },
      }),
    ).toBe(false);
    expect(
      await DB.use(QueueJobSqlite).exist({
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
    app().config.set("queue.defaultConnection", "mysql");
    await DB.disconnect();
    await DB.connect();
    await DB.use(QueueJobMysql).delete({});
    await DB.use(QueueJobFailedMysql).delete({});
  });
  test("data not truncated on when stored on QueueJobFailed", async () => {
    await DB.use(QueueJobFailedMysql).insert({
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
    const queueJob = await DB.use(QueueJobMysql).findOne({
      where: {
        reserved_at: IsNull(),
      },
      order: {
        id: "ASC",
      },
    });
    expect(
      await DB.use(QueueJobMysql).exist({
        where: {
          reserved_at: IsNull(),
          available_at: LessThanOrEqual(new Date()),
        },
      }),
    ).toBe(false);
    expect(
      await DB.use(QueueJobMysql).exist({
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
    app().config.set("queue.defaultConnection", "postgres");
    await DB.disconnect();
    await DB.connect();
    await DB.use(QueueJobPg).delete({});
    await DB.use(QueueJobFailedPg).delete({});
  });
  test("data not truncated on when stored on QueueJobFailed", async () => {
    await DB.use(QueueJobFailedPg).insert({
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
    const queueJob = await DB.use(QueueJobPg).findOne({
      where: {
        reserved_at: IsNull(),
      },
      order: {
        id: "ASC",
      },
    });
    expect(
      await DB.use(QueueJobPg).exist({
        where: {
          reserved_at: IsNull(),
          available_at: LessThanOrEqual(new Date()),
        },
      }),
    ).toBe(false);
    expect(
      await DB.use(QueueJobPg).exist({
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

  test("dispatch event but failed with retries", async () => {
    // reset database
    await DB.use(QueueJobPg).delete({});
    await DB.use(QueueJobFailedPg).delete({});

    await DummyEvent.dispatch({ foo: "bar", fail: true });

    const start = new Date();
    await Queue.pool({ tries: 2, queue: "default" });
    //job should not be failed, because has 1 retry left
    expect(
      await DB.use(QueueJobFailedPg).exist({
        where: {
          failed_at: LessThanOrEqual(new Date()),
        },
      }),
    ).toBe(false);
    const queueJob = await DB.use(QueueJobPg).findOne({
      where: {
        reserved_at: LessThanOrEqual(new Date()),
      },
      order: {
        id: "ASC",
      },
    });
    expect(dayjs(queueJob?.available_at).diff(start, "seconds")).toBe(
      Queue.config().retryAfter,
    );
  });
});
