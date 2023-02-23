const knex = require("knex")(require("../knexfile"));

exports.index = (_req, res) => {
    knex("items")
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((error) =>
        res.status(400).send(`Error retrieving items: ${error}`)
      );
  };

  exports.singleItem = (req, res) => {
    knex("items")
      .where({ id: req.params.id })
      .then((data) => {
        if (!data.length) {
          return res
            .status(404)
            .send(`Record with id: ${req.params.id} is not found`);
        }
        res.status(200).json(data[0]);
      })
      .catch((err) =>
        res.status(400).send(`Error retrieving item ${req.params.id} ${err}`)
      );
  };