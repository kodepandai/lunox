import User from "../app/Model/User";
import TestCase from "../TestCase";
import bcrypt from "bcryptjs";

TestCase.make();

describe("eloquent model feature test", () => {
  test("hidden attribute should be hidden from json but still accessible from model instance", async () => {
    const user = await User.query().first();
    if (user) {
      expect(Object.keys(JSON.parse(JSON.stringify(user)))).not.toContain(
        "password"
      );
      expect(user.password).toBeDefined();
    }
  });

  it("can access custom attribute via getter", async () => {
    const user = await User.query().first();
    if (user) {
      expect(user).toMatchObject({
        username: "user",
        email: "user@example.mail",
        firstname: "Mr. John", // firstname is overrided by getter
        full_name: "Mr. John Doe", // custom attribute
      });
    }
  });

  test("appended attribute should be available on json", async () => {
    // without appends, attribute still accessible on model instance
    // but no it json
    const user1 = await User.query().first();
    if (user1) {
      expect(user1.full_name).toBeDefined();
      expect(Object.keys(JSON.parse(JSON.stringify(user1)))).not.toContain(
        "full_name"
      );
    }

    // with appends, attribute should be available on json.
    User.setAppends(["full_name"]);
    const user2 = await User.query().first();
    if (user2) {
      expect(Object.keys(JSON.parse(JSON.stringify(user2)))).toContain(
        "full_name"
      );
    }
  });

  it("can update model via save method", async () => {
    const user = await User.query().first();
    if (user) {
      user.firstname = "Akhmad";
      user.lastname = "Salafudin";
      await user.save();
      expect(user.full_name).toBe("Mr. Akhmad Salafudin");
      const updatedUser = await User.query().findById(user.id);
      expect(updatedUser?.full_name).toBe("Mr. Akhmad Salafudin");
    }
  });

  it("can insert model via save method", async () => {
    const user = new User();
    user.firstname = "Kode";
    user.lastname = "Pandai";
    user.email = "kodepandaiofficial@gmail.com";
    user.username = "kodepandai";
    user.password = "pandai";
    expect(bcrypt.compareSync("pandai", user.password)).toBeTruthy();
    expect(user.full_name).toBe("Mr. Kode Pandai");
    await user.save();
    expect(user.id).toBe(2);
    const latestUser = await User.query().orderBy("id", "DESC").first();
    expect(latestUser?.id).toBe(2);
    expect(bcrypt.compareSync("pandai", latestUser?.password as string));
  });

  it("can insert model to database", async () => {
    const inserted = await User.query().insert({
      username: "user2",
      email: "user2@example.mail",
      firstname: "John",
      lastname: "Wick",
      password: "password",
    });

    expect(inserted.id).toBe(3);
    expect(
      bcrypt.compareSync("password", inserted.password as string)
    ).toBeTruthy();
    const latestUser = await User.query().orderBy("id", "DESC").first();
    expect(latestUser?.id).toBe(3);
    expect(
      bcrypt.compareSync("password", latestUser?.password as string)
    ).toBeTruthy();
  });
});
