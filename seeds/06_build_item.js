exports.seed = async function(knex) {
  await knex('build_item').del()
  await knex('build_item').insert([
    {
      build_id: 1,
      item_id: 4,  
    },
    {
      build_id: 2,
      item_id: 2,
    }
  ]);
};
