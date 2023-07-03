import { DB } from "../../src";
import TestCase from "../TestCase";
import { describe, expect, it } from "vitest";
import fs from "fs";

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
