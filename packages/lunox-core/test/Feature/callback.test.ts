import { describe, test, expect } from "vitest";
import TestCase from "../TestCase";
import CallbackServiceProvider from "../app/Providers/CallbackServiceProvider";
import { Router } from "../../src";

TestCase.make();

describe("Callback Resolve Testing", () => {
  test("after resolve", async () => {
    expect(CallbackServiceProvider.test.beforeResolvingParams.includes(Router.symbol)).toBeTruthy()
    expect(CallbackServiceProvider.test.resolvingParams[0] instanceof Router).toBeTruthy();
    expect(CallbackServiceProvider.test.afterResolvingParams[0] instanceof Router).toBeTruthy();
  });
});
