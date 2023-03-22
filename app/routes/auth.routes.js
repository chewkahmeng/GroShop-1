const express = require('express');
var router = express.Router();
const authController = require("../controllers/auth.controller.js");
const bcrypt = require("bcrypt");
//middleware to read req.body.<params>
//CREATE USER
router.post("/register", authController.registerUser);
router.post("/login", authController.loginUser);

module.exports = router;