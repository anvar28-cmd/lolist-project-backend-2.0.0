const knex = require("knex")(require("../knexfile"));

exports.index = (_req, res) =>
  knex("heroes")
    .then((data) => res.status(200).json(data))
    .catch((error) =>
      res.status(400).send(`Error retrieving heroes: ${error}`)
    );

exports.singleHero = (req, res) =>
  knex("heroes")
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

exports.builds = async (req, res) => {
  const hero = await knex("heroes").where({ slug: req.params.slug }).first();
  const serverBuilds = await knex("builds").where({
    user_id: req.payload.id,
    hero_id: hero.id,
  });

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


