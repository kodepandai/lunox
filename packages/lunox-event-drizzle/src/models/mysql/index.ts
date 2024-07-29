import {
  mysqlTable,
  int,
  varchar,
  binary,
  tinyint,
  datetime,
  timestamp,
  text
} from "drizzle-orm/mysql-core";
export const queueJobs = mysqlTable("queue_jobs", {
  id: int("id").autoincrement().primaryKey(),
  queue: varchar("queue", { length: 255 }).notNull(),
  payload: binary("payload").notNull(),
  attempts: tinyint("attempts").notNull().default(0),
  reserved_at: datetime("reserved_at", { mode: "date" }),
  available_at: datetime("available_at", { mode: "date" }),
  created_at: timestamp("created_at", { mode: "date" }).notNull().$defaultFn(()=>new Date())
});

export const queueFailedJobs = mysqlTable("queue_failed_jobs",{
  id: int("id").autoincrement().primaryKey(),
  queue: varchar("queue", { length: 255 }).notNull(),
  payload: binary("payload").notNull(),
  exception: text("exception").notNull(),
  failed_at: datetime("failed_at", { mode: "date" }),
});
