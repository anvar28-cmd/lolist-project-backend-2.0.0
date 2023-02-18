const knex = require("knex")(require("../knexfile"));

exports.index =  async (_req, res) => {
  const heroes = await knex("heroes").get();

  res.json(heroes);
};

exports.singleHero =  async (req, res) => {
  const hero = await knex("heroes")
    .where({ slug: req.params.slug })
    .then((data) => {
        if (!data.length) {
          return res
            .status(404)
            .send(`Record with slug: ${req.params.slug} is not found`);
        }
        res.status(200).json(data[0]);
      })
      .catch((err) =>
        res.status(400).send(`Error retrieving hero ${req.params.slug} ${err}`)
      );

  res.json(hero);
};