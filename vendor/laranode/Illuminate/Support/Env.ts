import { config } from "dotenv";

class Env {
  constructor() {
    config();
  }

  get(key: string, defaultValue: string | boolean | null = null) {
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
