const express = require('express');
var router = express.Router();
const { check, validationResult } = require('express-validator')
const addressController = require("../controllers/address.controller.js");
const middleware = require("../middleware/middleware.js")

router.get("/create", 
    middleware.isLoggedIn,
    (req, res) => {
        res.render('user/addressForm', {
            user: req.user,
            mode: "CREATE"
        })
    })

router.post("/create", 
    middleware.isLoggedIn,
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

router.get("/:id", middleware.isLoggedIn,addressController.getAddress)

router.get("/:id/update",
    middleware.isLoggedIn,
    addressController.getAddressToUpdate
)

router.post("/:id/update",
    middleware.isLoggedIn,
    addressController.validateAddress,
    (req, res, next) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            errors.array().forEach(err => req.flash('error', err.msg));
            return res.redirect(`/home/address/${req.params.id}/update`);
        }
        next()
    },
    addressController.updateAddress
)

router.post("/:id/delete",
    middleware.isLoggedIn,
    addressController.deleteAddress
)

module.exports = router;