exports.seed = async function(knex) {
  await knex('builds').del()
  await knex('builds').insert([
    {
      user_id: 1,
      hero_id: 1,
      name: "Warrior's build",
      
    },
    {
      user_id: 1,
      hero_id: 2,
      name: "Cool build",
    }
  ]);
};
