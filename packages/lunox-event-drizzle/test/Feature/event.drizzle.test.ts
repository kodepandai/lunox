import { Queue } from "@lunoxjs/event";
import TestCase from "../TestCase";
import { beforeAll, describe, expect, test } from "vitest";
import dayjs from "dayjs";
import { DB } from "@lunoxjs/drizzle";
import { serialize } from "v8";
import { RuntimeException } from "@lunoxjs/core";
import DummyEvent from "../app/Events/DummyEvent";
import {
  queueJobs as queueJobsSqlite,
  queueFailedJobs as queueFailedJobsSqlite,
} from "../../src/models/sqlite";
import {
  queueJobs as queueJobsPostgre,
  queueFailedJobs as queueFailedJobsPostgre,
} from "../../src/models/postgre";
import {
  queueJobs as queueJobsMysql,
  queueFailedJobs as queueFailedJobsMysql,
} from "../../src/models/mysql";
import mysqlConfig, { sqliteConfig } from "../config/database";
import { and, asc, eq, isNull, lte } from "drizzle-orm";
TestCase.make();
describe("Using Sqlite Database", async () => {
  beforeAll(async () => {
    app().config.set("database", sqliteConfig);
    app().config.set("queue.defaultConnection", "sqlite");
    DB.connect();
    await DB.delete(queueJobsSqlite);
    await DB.delete(queueFailedJobsSqlite);
  });
  test("data not truncated on when stored on QueueJobFailed", async () => {
    await DB.insert(queueFailedJobsSqlite).values({
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
    const queueJob = (
      await DB.select()
        .from(queueJobsSqlite)
        .where(isNull(queueJobsSqlite.reserved_at))
        .orderBy(asc(queueJobsSqlite.id))
        .limit(1)
    )[0];

    expect(
      await DB.select()
        .from(queueJobsSqlite)
        .where(
          and(
            isNull(queueJobsSqlite.reserved_at),
            lte(queueJobsSqlite.available_at, new Date()),
          ),
        ),
    ).toHaveLength(0);

    expect(
      await DB.select()
        .from(queueJobsSqlite)
        .where(
          and(
            isNull(queueJobsSqlite.reserved_at),
            lte(
              queueJobsSqlite.available_at,
              dayjs().add(6, "minute").toDate(),
            ),
          ),
        ),
    ).toHaveLength(1);
    expect(
      dayjs(queueJob?.available_at).diff(dayjs(queueJob?.created_at), "minute"),
    ).toBe(6);
  });

  test("dispatch event but failed with retries", async () => {
    // reset database
    await DB.delete(queueJobsSqlite);
    await DB.delete(queueFailedJobsSqlite);

    await DummyEvent.dispatch({ foo: "bar", fail: true });

    await Queue.pool({ tries: 2, queue: "default" });
    //job should not be failed, because has 1 retry left
    expect(
      await DB.select()
        .from(queueFailedJobsPostgre)
        .where(lte(queueFailedJobsSqlite.failed_at, new Date())),
    ).toHaveLength(0);

    const queueJob = (
      await DB.select()
        .from(queueJobsSqlite)
        .where(lte(queueJobsSqlite.reserved_at, new Date()))
        .orderBy(asc(queueJobsSqlite.id))
        .limit(1)
    )[0];
    expect(
      dayjs(queueJob?.available_at).diff(queueJob?.reserved_at, "seconds"),
    ).toBe(Queue.config().retryAfter);
  });
});

describe("Using Mysql Database", async () => {
  beforeAll(async () => {
    app().config.set("database", mysqlConfig);
    app().config.set("queue.defaultConnection", "mysql");
    DB.connect();
    await DB.delete(queueJobsMysql);
    await DB.delete(queueFailedJobsMysql);
  });
  test("data not truncated on when stored on QueueJobFailed", async () => {
    await DB.insert(queueFailedJobsMysql).values({
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
    const queueJob = (
      await DB.select()
        .from(queueJobsMysql)
        .where(isNull(queueJobsMysql.reserved_at))
        .orderBy(asc(queueJobsMysql.id))
        .limit(1)
    )[0];

    expect(
      await DB.select()
        .from(queueJobsMysql)
        .where(
          and(
            isNull(queueJobsMysql.reserved_at),
            lte(queueJobsMysql.available_at, new Date()),
          ),
        ),
    ).toHaveLength(0);

    expect(
      await DB.select()
        .from(queueJobsMysql)
        .where(
          and(
            isNull(queueJobsMysql.reserved_at),
            lte(
              queueJobsMysql.available_at,
              dayjs().add(6, "minute").toDate(),
            ),
          ),
        ),
    ).toHaveLength(1);
    expect(
      Math.ceil(dayjs(queueJob?.available_at).diff(dayjs(queueJob?.created_at), "seconds")/60),
    ).toBe(6);
  });

  test("dispatch event but failed with retries", async () => {
    // reset database
    await DB.delete(queueJobsMysql);
    await DB.delete(queueFailedJobsMysql);

    await DummyEvent.dispatch({ foo: "bar", fail: true });

    await Queue.pool({ tries: 2, queue: "default" });
    //job should not be failed, because has 1 retry left
    expect(
      await DB.select()
        .from(queueFailedJobsPostgre)
        .where(lte(queueFailedJobsMysql.failed_at, new Date())),
    ).toHaveLength(0);

    const queueJob = (
      await DB.select()
        .from(queueJobsMysql)
        .where(lte(queueJobsMysql.reserved_at, new Date()))
        .orderBy(asc(queueJobsMysql.id))
        .limit(1)
    )[0];
    expect(
      dayjs(queueJob?.available_at).diff(queueJob?.reserved_at, "seconds"),
    ).toBe(Queue.config().retryAfter);
  });
});
