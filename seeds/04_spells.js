const data = require("../seed_data/04_spells.json");
const spells = Object.values(data);
const spellInput = spells.map(({name, description, image}) => {
  return {
    name,
    blurb: description,
    image: `http://ddragon.leagueoflegends.com/cdn/13.3.1/img/spell/${image.full}`,
  }
});

exports.seed = async function (knex) {
  await knex('spells').del();
  await knex('spells').insert(spellInput);
}