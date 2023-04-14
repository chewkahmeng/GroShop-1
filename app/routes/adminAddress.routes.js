const express = require('express');
var router = express.Router();
const { check, validationResult } = require('express-validator')
const adminAddressController = require("../controllers/adminAddress.controller.js");
const middleware = require("../middleware/middleware.js")

router.get("/create", 
    middleware.isLoggedIn,
    (req, res) => {
        res.render('admin/addressForm', {
            employee: req.user,
            mode: "CREATE"
        })
    })

router.post("/create", 
    middleware.isLoggedIn,
    adminAddressController.validateAddress,
    (req, res, next) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            errors.array().forEach(err => req.flash('error', err.msg));
            return res.redirect('/admin/address/create');
        }
        next()
    },
    adminAddressController.createAddress
)

router.get("/:id/update",
    middleware.isLoggedIn,
    adminAddressController.getAddressToUpdate
)

router.post("/:id/update",
    middleware.isLoggedIn,
    adminAddressController.validateAddress,
    (req, res, next) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            errors.array().forEach(err => req.flash('error', err.msg));
            return res.redirect(`/admin/address/${req.params.id}/update`);
        }
        next()
    },
    adminAddressController.updateAddress
)

router.post("/:id/delete",
    middleware.isLoggedIn,
    adminAddressController.deleteAddress
)

module.exports = router;