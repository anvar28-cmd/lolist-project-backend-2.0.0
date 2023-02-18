exports.seed = async function(knex) {
  await knex('build_spell').del()
  await knex('build_spell').insert([
    {
      build_id: 1,
      spell_id: 4,  
    },
    {
      build_id: 2,
      spell_id: 2,
    }
  ]);
};
