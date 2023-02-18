const users = require("../seed_data/01_users.json");

exports.seed = async function(knex) {
  await knex('users').del();
  await knex('users').insert(users);
};
