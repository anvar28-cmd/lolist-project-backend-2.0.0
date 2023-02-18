exports.up = function (knex) {
    return knex.schema.createTable("items", (table) => {
      table.increments("id").primary();
      table.string("name").notNullable();
      table.string("blurb").notNullable();
      table.string("image").notNullable();
      table.integer("gold").notNullable();
    });
  };
  
  exports.down = function (knex) {
    return knex.schema.dropTable("items");
  };
  
  