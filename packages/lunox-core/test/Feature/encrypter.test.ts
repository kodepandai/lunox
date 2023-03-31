import { Crypt, Encrypter } from "../../src";
import TestCase from "../TestCase";

TestCase.make();

describe("Encrypter Testing", () => {
  test("can encrypt and decrypt object", async () => {
    const encrypted = Crypt.encrypt({ id: 1, key: "foo" });
    expect(Crypt.decrypt(encrypted)).toMatchObject({
      id: 1,
      key: "foo",
    });
  });

  test("can encrypt and decrypt string", async () => {
    const encrypted = Crypt.encrypt("hello lunox");
    expect(Crypt.decrypt(encrypted)).toMatch("hello lunox");
  });

  test("save time attack comparison", () => {
    const encrypted = Crypt.encrypt("hello lunox");
    expect(
      Encrypter.hashEquals(Crypt.decrypt(encrypted), "hello lunox")
    ).toBeTruthy();
  });
});
