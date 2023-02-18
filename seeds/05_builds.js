exports.seed = async function(knex) {
  await knex('builds').del();
};
