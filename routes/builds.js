const express = require("express");
const router = express.Router();

const buildsController = require('../controllers/buildsController')

router
  .route("/")
  .get(buildsController.index)
  .post(buildsController.store);

module.exports = router;