const table_name = "users";

/**
 * Up the Migration with knex
 * @param {import('knex').Knex} knex
 */
export const up = function (knex) {
  return knex.schema.createTable(table_name, (t) => {
    t.bigIncrements("id").primary().notNullable();

    t.timestamps(true, true);
  });
};
/**
 * Drop the Migration with knex
 * @param {import('knex').Knex} knex
 */
export const down = function (knex) {
  return knex.schema.dropTableIfExists(table_name);
};
