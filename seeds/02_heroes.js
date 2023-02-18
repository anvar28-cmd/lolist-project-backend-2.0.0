const data = require("../seed_data/02_heroes.json");
const heroes = Object.values(data);
const heroInput = heroes.map(({ name, slug, title, blurb, image}) => {
  return {
    name,
    slug,
    title,
    blurb,
    image: `http://ddragon.leagueoflegends.com/cdn/13.1.1/img/champion/${image.full}`,
  };
});

exports.seed = async function (knex) {
  await knex("heroes").del();
  await knex("heroes").insert(heroInput);
};
