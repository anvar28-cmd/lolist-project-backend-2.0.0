exports.seed = async function(knex) {
  await knex('users').del()
  await knex('users').insert([
    {
      id: 1,
      username: "shimazu28",
      password: "asd",
      name: "Anvar Gulomov"
    },
    {
      id: 2,
      username: "alchemist7797",
      password: "naruto",
      name: "Daler Yusupov"
    },
    {
      id: 3,
      username: "obiwan",
      password: "sher",
      name: "Shepard Sharipov"
    },
    {
      id: 4,
      username: "x-ray",
      password: "kotoklism",
      name: "Oleg Ilyasov"
    }
  ]);
};