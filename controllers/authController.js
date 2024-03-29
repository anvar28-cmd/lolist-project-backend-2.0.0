const knex = require("knex")(require("../knexfile"));
const jwt = require("jsonwebtoken");
const secret = process.env.SECRET_KEY ?? "secret123";

exports.login = async (req, res) => {
  const { username, password } = req.body;

  const user = await knex("users").where({ username }).first();

  if (user?.password === password) {
    const token = jwt.sign({ username, id: user.id }, secret);

    res.json({ ...user, token });
  } else {
    res.status(401).json({
      error: {
        message: "Login failed",
      },
    });
  }
};

exports.signup = async (req, res) => {
  const { username, password, name } = req.body;

  const isValid = await knex('users').where({ username }).first() ? false : true;

  if (isValid) {
    try {
      await knex('users').insert({ username, password, name });
      const user = await knex("users").where({ username }).first();
      const token = jwt.sign({ username, id: user.id }, secret);
      res.json({ ...user, token });
    } catch(error) {
      res.status(401).json({error: { message: "Something went wrong" }});
    }
  } else {
    res.status(401).json({error: { message: "Username already exists" }});
  }
};
