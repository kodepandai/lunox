import { boolean, mysqlTable, int, text, timestamp } from "drizzle-orm/mysql-core";

export const users = mysqlTable('users',{
  id: int('id').primaryKey().autoincrement(),
  username: text('username').notNull(),
  email: text('email').notNull().unique(),
  first_name: text('first_name').notNull(),
  last_name: text('last_name').notNull(),
  active: boolean('active').default(true),
  password: text('password').notNull(),
})
