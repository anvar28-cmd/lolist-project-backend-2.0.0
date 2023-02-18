const knex = require("knex")(require("../knexfile"));
const jwt = require("jsonwebtoken");
const secret = process.env.SECRET_KEY ?? "secret123";

exports.index = (_req, res) => {
  knex("users")
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) =>
      res.status(400).send(`Error retrieving signup users: ${err}`)
    );
};

exports.addUser = async (req, res) => {
  const { username, password, name } = req.body;
   await knex("users").insert({ username, password, name });

  console.log("added user - sending response");
  const token = jwt.sign({ username}, secret);
  res.json({ token });
};
