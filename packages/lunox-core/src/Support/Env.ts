import { config } from "dotenv";

class Env {
  public static symbol = Symbol("Env");
  constructor() {
    config();
  }

  get(key: string, defaultValue: string | boolean | null | number = null): any {
    switch (process.env[key]?.toLowerCase()) {
      case undefined:
        return defaultValue;
      case "true":
      case "(true)":
        return true;
      case "false":
      case "(false)":
        return false;
      default:
        return process.env[key];
    }
  }
}

export default Env;
