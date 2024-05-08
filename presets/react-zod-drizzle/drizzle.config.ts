import type { Config } from "drizzle-kit";
export default {
  driver: "mysql2",
  schema: "./database/schema.ts",
  out: "./drizzle",
} satisfies Config;
