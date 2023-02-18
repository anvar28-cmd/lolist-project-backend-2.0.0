const { data } = require("../seed_data/spells.json");
const spells = Object.values(data);
const spellInput = spells.map((spell, i) => {
  return {
    id: i,
    name: spell.name,
    blurb: spell.description,
    image: `http://ddragon.leagueoflegends.com/cdn/13.3.1/img/spell/${spell.image.full}`,
  }
});

exports.seed = async function (knex) {
  await knex('spells').del();
  await knex('spells').insert(spellInput);
}