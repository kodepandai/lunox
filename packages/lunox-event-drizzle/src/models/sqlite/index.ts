import { sqliteTable, integer, int, blob, text } from "drizzle-orm/sqlite-core";
export const queueJobs = sqliteTable("queue_jobs", {
  id: int("id").primaryKey({ autoIncrement: true }),
  queue: text("queue", { length: 255 }).notNull(),
  payload: blob("payload").notNull(),
  attempts: int("attempts").notNull().default(0),
  reserved_at: int("reserved_at", { mode: "timestamp" }),
  available_at: int("available_at", { mode: "timestamp" }),
  created_at: int("created_at", { mode: "timestamp" })
    .notNull()
    .default(new Date()),
});

export const queueFailedJobs = sqliteTable("queue_failed_jobs", {
  id: int("id").primaryKey({ autoIncrement: true }),
  queue: text("queue", { length: 255 }).notNull(),
  payload: blob("payload").notNull(),
  exception: text("exception").notNull(),
  failed_at: integer("failed_at", { mode: "timestamp" }),
});
