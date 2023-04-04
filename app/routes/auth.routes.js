const express = require('express');
var router = express.Router();
const authController = require("../controllers/auth.controller.js");
const bcrypt = require("bcrypt");
const db = require("../models");
const User = db.users;
const Employee = db.employees;
//middleware to read req.body.<params>

router.post("/register", authController.register);
router.post("/login", authController.login);
router.put("/:id/update", authController.updateUser);
router.put("/:id/update/password", authController.changeUserPassword);
router.delete("/:id/delete", authController.deleteUser);
router.get("/:id", authController.retrieveUserDetails);

module.exports = router;