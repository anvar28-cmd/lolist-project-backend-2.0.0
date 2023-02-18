exports.up = function (knex) {
    return knex.schema.createTable("heroes", (table) => {
      table.increments("id").primary(); 
      table.string("name").notNullable();
      table.string("slug").unique();
      table.string("title").notNullable();
      table.string("blurb", 1000).notNullable();
      table.string("image").notNullable();
    });
  };
  
  exports.down = function (knex) {
    return knex.schema.dropTable("heroes");
  };
  