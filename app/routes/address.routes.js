const express = require('express');
var router = express.Router();
const { check, validationResult } = require('express-validator')
const addressController = require("../controllers/address.controller.js");
const middleware = require("../config/middleware.js")

router.get("/address/create", middleware.isLoggedIn,(req, res) => {res.render('address', {user: req.user})})

router.post("/address/create", 
    addressController.validateAddress,
    (req, res, next) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            errors.array().forEach(err => req.flash('error', err.msg));
            return res.redirect('/home/address/create');
        }
        next()
    },
    addressController.createAddress
)

router.post("/address", addressController.getAddress)

module.exports = router;