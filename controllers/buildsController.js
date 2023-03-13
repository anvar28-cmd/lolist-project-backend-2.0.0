const knex = require("knex")(require("../knexfile"));

exports.index = async (req, res) => {
  const serverBuilds = await knex("builds").where({ user_id: req.payload.id });

  const clientBuilds = [];

  for (let i = 0; i < serverBuilds.length; i++) {
    const serverBuild = serverBuilds[i];

    const hero = await knex("heroes")
      .where({ id: serverBuild.hero_id })
      .first();

    const buildItems = await knex("build_item").where({
      build_id: serverBuild.id,
    });
    const items = [];
    for (let k = 0; k < buildItems.length; k++) {
      const buildItem = buildItems[k];
      const item = await knex("items").where({ id: buildItem.item_id }).first();
      items.push(item);
    }

    const buildSpells = await knex("build_spell").where({
      build_id: serverBuild.id,
    });
    const spells = [];
    for (let j = 0; j < buildSpells.length; j++) {
      const buildSpell = buildSpells[j];
      const spell = await knex("spells")
        .where({ id: buildSpell.spell_id })
        .first();
      spells.push(spell);
    }

    clientBuilds.push({
      id: serverBuild.id,
      title: serverBuild.name,
      user_id: serverBuild.user_id,
      hero,
      items,
      spells,
    });
  }

  res.status(200).json(clientBuilds);
};

exports.store = async (req, res) => {
  try {
    const newBuildID = await knex("builds").insert({
      user_id: req.payload.id,
      hero_id: req.body.heroID,
      name: req.body.title,
    });

    req.body.items.forEach(
      async (id) =>
        await knex("build_item").insert({
          build_id: newBuildID,
          item_id: id,
        })
    );

    req.body.spells.forEach(
      async (id) =>
        await knex("build_spell").insert({
          build_id: newBuildID,
          spell_id: id,
        })
    );

    res.status(200).send("Success");
  } catch (error) {
    res.status(400).send(`Error `);
  }
};


exports.editBuild = (req, res) => {
  if (
    !req.body.hero_id ||
    !req.body.name ||
    !req.body.build_id ||
    !req.body.item_id ||
    !req.body.spell_id
  ) {
    return res
      .status(400)
      .send(
        "Please make sure to add hero id, name of the build, items and spells"
      );
  }
  knex("builds")
    .update(req.body)
    .where({ id: req.params.id })
    .then(() => {
      res
        .status(200)
        .send(`Build with id: ${req.params.id} has been updated`);
    })
    .catch((err) =>
      res.status(400).send(`Error updating build ${req.params.id} ${err}`)
    );
};

exports.delete = (req, res) => 
  knex("builds")
    .where({ id: req.params.id })
    .delete()
    .then(() => {
      res
        .status(204)
        .send(`Build with id: ${req.params.id} has been deleted`);
    })
    .catch((err) =>
      res.status(400).send(`Error deleting build ${req.params.id} ${err}`)
    );
