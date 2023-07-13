import { z, ZodRawShape } from "zod";
import ValidationException from "./ValidationException";
class Validator<T extends ZodRawShape> {
  public static symbol = Symbol("ZodValidator");

  protected data: Record<string, any>;
  protected schema: z.ZodObject<T>;

  constructor(
    data: Record<string, any>,
    rules: T
    // messages: Record<string, string> = {},
    // customAttributes: Record<string, string> = {}
  ) {
    this.data = data;
    this.schema = z.object(rules);
  }

  public async validate() {
    try {
      return (await this.schema.parseAsync(this.data)) as z.infer<typeof this.schema>;
    } catch (e) {
      if (e instanceof z.ZodError) {
        throw new ValidationException(e);
      }
      throw e;
    }
  }
}

export default Validator;
