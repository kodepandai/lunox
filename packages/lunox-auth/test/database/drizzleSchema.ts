import { sqliteTable, int, text } from "drizzle-orm/sqlite-core";

export const users = sqliteTable('users',{
  id: int('id').primaryKey({autoIncrement: true}),
  email: text('email').notNull().unique(),
  password: text('password').notNull(),
  remember_token: text('remember_token')
})
