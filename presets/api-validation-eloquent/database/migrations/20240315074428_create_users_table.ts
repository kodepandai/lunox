import type { Knex } from "@lunoxjs/eloquent";

const table_name = "users";

/**
 * Up the Migration
 */
export const up = function (db: Knex) {
  return db.schema.createTable(table_name, (t) => {
    t.bigIncrements("id").primary().notNullable();
    t.string("email").unique().notNullable();
    t.string("user_name").notNullable();
    t.string("password").notNullable();
    t.string("first_name").nullable();
    t.string("last_name").nullable();
    t.boolean("is_active").defaultTo(true);
    t.timestamps(true, true);
  });
};

/**
 * Drop the Migration with knex
 */
export const down = function (db: Knex) {
  return db.schema.dropTableIfExists(table_name);
};

// halooo
