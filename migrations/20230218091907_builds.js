exports.up = function (knex) {
    return knex.schema.createTable("builds", (table) => {
      table.increments("id").primary();
      table
      .integer("user_id")
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('users')
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
  
      table
        .integer("hero_id")
        .notNullable()
        .references("heroes.id")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
  
      table.string("name", 256).notNullable();
    });
  };
  
  exports.down = function (knex) {
    return knex.schema.dropTable("builds");
  };
  