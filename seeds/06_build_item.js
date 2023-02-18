exports.seed = async function(knex) {
  await knex('build_item').del();
};
