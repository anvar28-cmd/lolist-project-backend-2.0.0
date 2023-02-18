const knex = require("knex")(require("../knexfile"));
const jwt = require("jsonwebtoken");
const secret = process.env.SECRET_KEY ?? "secret123";

exports.index = (_req, res) => {
  knex("users")
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) =>
      res.status(400).send(`Error retrieving login users: ${err}`)
    );
};

exports.loginUser = async (req, res) => {
  const { username, password } = req.body;

  const user = await knex("users").where({ username }).first();

  if (user?.password === password) {
    const token = jwt.sign({ username, id: user.id }, secret);
    res.json({ token, user });
  } else {
    res.status(401).json({
      error: {
        message: "Login failed",
      },
    });
  }
};
