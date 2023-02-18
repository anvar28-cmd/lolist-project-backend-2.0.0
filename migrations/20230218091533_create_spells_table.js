exports.up = function (knex) {
    return knex.schema.createTable("spells", (table) => {
      table.integer("id").primary();
      table.string("name").notNullable();
      table.string("blurb").notNullable();
      table.string("image").notNullable();
    });
  };
  
  exports.down = function (knex) {
    return knex.schema.dropTable("spells");
  };
  