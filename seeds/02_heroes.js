const { data } = require("../seed_data/heroes.json");
const heroes = Object.values(data);
const heroInput = heroes.map((hero, index) => {
  return {
    id: index, 
    name: hero.name,
    slug: hero.id,
    title: hero.title,
    blurb: hero.blurb,
    image: `http://ddragon.leagueoflegends.com/cdn/13.1.1/img/champion/${hero.image.full}`,
  };
});

exports.seed = async function (knex) {
  await knex("heroes").del();
  await knex("heroes").insert(heroInput);
};


