var router = require("express").Router();
const middleware = require("../middleware/middleware.js")
const cartController = require("../controllers/cart.controller.js");


const { check, validationResult } = require('express-validator')

// Recipe Home Page
router.get("/mycart", middleware.isLoggedIn, cartController.getMyCart)


module.exports = router