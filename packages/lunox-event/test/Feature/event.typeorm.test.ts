import { Event } from "../../src";
import TestCase from "../TestCase";
import { describe, expect, test } from "vitest";
import DummyEvent from "../app/Events/DummyEvent";
import DummyListener from "../app/Listeners/DummyListener";

TestCase.make();
describe("General test", () => {
  test("can get list event listeners", async () => {
    expect(Event.getListener(DummyEvent.key)[0]).toBe(DummyListener);
  });
});
