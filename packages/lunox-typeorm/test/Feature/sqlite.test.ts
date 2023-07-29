import { DB } from "../../src";
import TestCase from "../TestCase";
import { describe, expect, it } from "vitest";
import fs from "fs";
import User from "../app/Models/User";

TestCase.useSqlite();
TestCase.make();

describe("Database Connection", async () => {
  it("success: read database config", async () => {
    expect(DB.getDefaultConnection()).toBe("sqlite");
  });
  it("success: sqlite file generated", async () => {
    const dbExist = fs.existsSync(base_path("database.sqlite"));
    expect(dbExist).toBeTruthy();
  });
});

describe("Read Database Data", async () => {
  it("success: read user table", async () => {
    const users = await DB.use(User).find();
    expect(users.length).toBe(0);
  });

  it("success: insert user", async () => {
    await DB.use(User).insert({ name: "test" });
    const users = await DB.use(User).find();
    expect(users.length).toBe(1);
    expect(
      await DB.use(User).exist({
        where: {
          name: "test",
        },
      }),
    ).toBeTruthy();
  });
});
