const knex = require("knex")(require("../knexfile"));

exports.index =  async (req, res) => {

  const {username} = req.payload;

  //get the prfile data from the database using the username (primary key)
  const profileData = await knex("users")
  .where({ username}).first();

  //sent the profile data back to the frontend
  res.json(profileData);
};