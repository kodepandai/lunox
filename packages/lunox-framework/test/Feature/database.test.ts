import { DB } from "../../src";
import User from "../app/Model/User";
import TestCase from "../TestCase";

TestCase.make();

describe("Database Testing", () => {
  test("can use query builder to access database", async () => {
    const user = await DB.table("users").first();
    expect(user).toMatchObject({
      username: "user",
      email: "user@example.mail",
    });
  });

  test("can use Model to access database", async () => {
    const user = await User.query().first();
    expect(user).toBeInstanceOf(User);
    expect(user).toMatchObject({
      username: "user",
      email: "user@example.mail",
    });
  });
});
