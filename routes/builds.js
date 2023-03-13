const express = require("express");
const router = express.Router();

const buildsController = require('../controllers/buildsController')

router
  .route("/")
  .get(buildsController.index)
  .post(buildsController.store);

router 
  .route("/:id")
  .delete(buildsController.delete)
  .put(buildsController.editBuild);
  
module.exports = router;