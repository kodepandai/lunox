import { z } from "zod";
import { ValidationException, Validator } from "../../src";
import TestCase from "../TestCase";
import { describe, expect, it } from "vitest";

TestCase.make();

describe("Handle Error", () => {
  it("can handle error", async () => {
    try {
      await Validator.make(
        {
          foo: 2,
          bar: [{}, { baz: 0 }],
        },
        {
          foo: z.string(),
          zod: z.string(),
          bar: z.array(
            z.object({
              baz: z.string(),
            }),
          ),
        },
      ).validate();
    } catch (e) {
      expect(e).toBeInstanceOf(ValidationException);
      if (e instanceof ValidationException) {
        expect(e.getZodError()).toBeInstanceOf(z.ZodError);
        expect(e.errors()).toMatchObject({
          foo: ["Expected string, received number"],
          zod: ["Required"],
          bar: {
            0: {
              baz: ["Required"],
            },
            1: {
              baz: ["Expected string, received number"],
            },
          },
        });
      }
    }
  });
});
