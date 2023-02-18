const data = require("../seed_data/03_items.json");
const items = Object.values(data);
const itemInput = items.map(({name, plaintext, image, gold}) => {
  return {
    name,
    blurb: plaintext,
    image: `http://ddragon.leagueoflegends.com/cdn/13.1.1/img/item/${image.full}`,
    gold: gold.total,
  }
});

exports.seed = async function (knex) {
  await knex("items").del();
  await knex("items").insert(itemInput);
}