const express = require('express');
const router = express.Router();

const heroesController = require('../controllers/heroesController');

router
  .route('/')
  .get(heroesController.index);

router
  .route('/:slug')
  .get(heroesController.singleHero);

router
  .route('/:slug/builds')
  .get(heroesController.builds);

module.exports = router;
