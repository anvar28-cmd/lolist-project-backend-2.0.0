exports.up = function (knex) {
  return knex.schema.createTable("build_spell", (table) => {
    table
      .integer("build_id")
      .unsigned()
      .notNullable()
      .references("builds.id")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");

    table
      .integer("spell_id")
      .unsigned()
      .notNullable()
      .references("spells.id")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("build_spell");
};
