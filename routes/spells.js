const express = require("express");
const router = express.Router();

const spellsController = require('../controllers/spellsController')

router.route("/").get(spellsController.index);

router
  .route("/:id")
  .get(spellsController.singleSpell)

module.exports = router;