const express = require('express');
const router = express.Router();
const fs = require("fs");

const loginController = require('../controllers/loginController');

router
.route('/')
.get(loginController.index)
.post(loginController.loginUser);


module.exports = router;
