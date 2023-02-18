exports.up = function (knex) {
  return knex.schema.createTable("build_item", (table) => {
    table
      .integer("build_id")
      .unsigned()
      .notNullable()
      .references("builds.id")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");

    table
      .integer("item_id")
      .unsigned()
      .notNullable()
      .references("items.id")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("build_item");
};
