const { data } = require("../seed_data/items.json");
const items = Object.values(data);
const itemInput = items.map((item, i) => {
  return {
    id: i,
    name: item.name,
    blurb: item.plaintext,
    image: `http://ddragon.leagueoflegends.com/cdn/13.1.1/img/item/${item.image.full}`,
    gold: item.gold.total,
  }
});

exports.seed = async function (knex) {
  await knex("items").del();
  await knex("items").insert(itemInput);
}