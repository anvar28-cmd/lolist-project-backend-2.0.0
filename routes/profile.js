const express = require('express');
const router = express.Router();
const fs = require('fs');

const profileController = require('../controllers/profileController');

router
.route('/')
.get(profileController.index);

module.exports = router;