import type { Knex } from "knex";

const table_name = "users";

/**
 * Up the Migration
 */
export const up = function (db: Knex) {
  return db.schema.createTable(table_name, (t) => {
    t.bigIncrements("id").primary().notNullable();
    t.string("email").unique().notNullable();
    t.string("username").notNullable();
    t.string("password").notNullable();
    t.string("fullname").nullable();
    t.string("phone").nullable();
    t.boolean("active").defaultTo(true);
    t.string("remember_token", 100).nullable();
    t.timestamps(true, true);
  });
};

/**
 * Drop the Migration with knex
 */
export const down = function (db: Knex) {
  return db.schema.dropTableIfExists(table_name);
};
