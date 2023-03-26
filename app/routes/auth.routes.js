const express = require('express');
var router = express.Router();
const authController = require("../controllers/auth.controller.js");
const bcrypt = require("bcrypt");
//middleware to read req.body.<params>

router.post("/register", authController.registerUser);
router.post("/login", authController.loginUser);
router.put("/:id/update", authController.updateUser);
router.put("/:id/update/password", authController.changeUserPassword);
router.delete("/:id/delete", authController.deleteUser);
router.get("/:id", authController.retrieveUserDetails);

module.exports = router;