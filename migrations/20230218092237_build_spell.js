exports.up = function (knex) {
    return knex.schema.createTable("build_spell", (table) => {
      table.increments("id").primary();
      table
      .integer("build_id")
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('builds')
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
  
      table
        .integer("spell_id")
        .notNullable()
        .references("spells.id")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
    });
  };
  
  exports.down = function (knex) {
    return knex.schema.dropTable("build_spell");
  };
  