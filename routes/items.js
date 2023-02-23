const express = require('express');
const router = express.Router();

const itemsController = require('../controllers/itemsController')

router
.route('/')
.get(itemsController.index);

router
.route('/:id')
.get(itemsController.singleItem)

module.exports = router