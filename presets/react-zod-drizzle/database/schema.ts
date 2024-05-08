import {
  boolean,
  mysqlTable,
  int,
  text,
} from "drizzle-orm/mysql-core";

export const users = mysqlTable("users", {
  id: int("id").primaryKey().autoincrement(),
  username: text("username").notNull(),
  email: text("email").notNull().unique(),
  first_name: text("first_name").notNull(),
  last_name: text("last_name").notNull(),
  is_active: boolean("is_active").default(true),
  password: text("password").notNull(),
  remember_token: text("remember_token")
});
