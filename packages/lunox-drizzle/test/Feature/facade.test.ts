import DB from "../../src/facades/DB";
import TestCase from "../TestCase";
import { describe, expect, it } from "vitest";
import { users } from "../database/schema";
import { sql } from "drizzle-orm";

TestCase.make();

describe("Facade Test", () => {
  it("can read database config", async () => {
    expect(DB.databaseConfig()).toHaveProperty("drizzle");
    try {
      await DB.migrate();
    } catch (e) {
      if (e instanceof Error && e.message.includes("already exists")) {
        return;
      }
      throw e;
    }
  });
  it("can insert data", async () => {
    const inserted = await DB.insert(users).values({
      first_name: "Akhmad",
      last_name: "Salafudin",
      email: Math.random() + "@.com",
      username: "dmuggle",
      password: "password",
    });
    expect(inserted[0].insertId).toBeTypeOf("number");
  });
  it("can get data using sql query builder", async () => {
    const result = await DB.select({
      id: users.id,
      full_name: sql`concat(${users.first_name}, ' ', ${users.last_name})`,
    }).from(users);
    expect(result[0]).toHaveProperty("id");
    expect(result[0]).toHaveProperty("full_name");
  });

  it("can get data using relational query", async () => {
    const result = await DB.query.users.findMany({
      extras: {
        fullName:
          sql<string>`concat(${users.first_name}, " ", ${users.last_name})`.as(
            "fullName",
          ),
      },
    });
    expect(result[0]).toHaveProperty("id");
    expect(result[0]).toHaveProperty("fullName");
  });
  it("can get data using raw query", async()=>{
    const result = (await DB.execute(sql`select * from users`))[0] as any
    expect(result[0]).toHaveProperty("id");
    expect(result[0]).toHaveProperty("username");
  })
});
