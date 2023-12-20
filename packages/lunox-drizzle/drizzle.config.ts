import type {Config} from "drizzle-kit"
export default {
  driver: "mysql2",
  schema: "./test/database/schema.ts",
  out: "./drizzle",
} satisfies Config;
