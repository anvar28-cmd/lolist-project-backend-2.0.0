const express = require('express');
const router = express.Router();
const fs = require('fs');

const signupController = require('../controllers/signupController')

router
.route('/')
.get(signupController.index)
.post(signupController.addUser)

module.exports = router