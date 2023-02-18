exports.seed = async function(knex) {
  await knex('build_spell').del();
};
