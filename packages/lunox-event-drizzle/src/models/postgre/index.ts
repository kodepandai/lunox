import {
  pgTable,
  serial,
  varchar,
  customType,
  timestamp,
  text,
  integer,
} from "drizzle-orm/pg-core";
const bytea = customType<{ data: Buffer; notNull: false; default: false }>({
  dataType() {
    return "bytea";
  },
});
export const queueJobs = pgTable("queue_jobs", {
  id: serial("id").primaryKey(),
  queue: varchar("queue", { length: 255 }).notNull(),
  payload: bytea("payload").notNull(),
  attempts: integer("attempts").notNull().default(0),
  reserved_at: timestamp("reserved_at", { mode: "date", withTimezone: true }),
  available_at: timestamp("available_at", { mode: "date", withTimezone: true }),
  created_at: timestamp("created_at", { mode: "date", withTimezone: true })
    .notNull()
    .defaultNow(),
});

export const queueFailedJobs = pgTable("queue_failed_jobs", {
  id: serial("id").primaryKey(),
  queue: varchar("queue", { length: 255 }).notNull(),
  payload: bytea("payload").notNull(),
  exception: text("exception").notNull(),
  failed_at: timestamp("failed_at", { mode: "date", withTimezone: true }),
});
