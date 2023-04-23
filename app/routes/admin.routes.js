const express = require('express');
var router = express.Router();
const adminController = require("../controllers/admin.controller.js");
const middleware = require("../middleware/middleware.js")
// Include Express Validator Functions
const { check, validationResult } = require('express-validator');

//middleware to read req.body.<params>

/*router.get('/', middleware.isLoggedIn, adminController.getUserProfile);

router.get("/:id/update", middleware.isLoggedIn, (req, res) => {
    res.render('admin/maintainProfile', {
        mode: 'UE',
        employee: req.user
    })
})
router.post("/:id/update", middleware.isLoggedIn, adminController.updateEmployee);

router.get("/:id/changePassword", middleware.isLoggedIn, (req, res) => {
    res.render('admin/maintainProfile', {
        mode: 'PW',
        employee: req.user
    })
})
router.post("/:id/changePassword", 
    middleware.isLoggedIn, 
    adminController.validatePasswordChange,
    (req, res, next) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            errors.array().forEach(err => req.flash('error', err.msg));
            return res.redirect(`/admin/profile/${req.user.id}/changePassword`);
        }
        next()
    },
    adminController.changeUserPassword
);*/

router.get('/', middleware.isLoggedIn, async (req, res) => {
    const url = `http://localhost:4001/${req.user.id}/getuserprofile`
    var user = null
    var address = null
    var role = null
    await fetch(url)
    .then(response => response.json())
    .then(data => {
        user = data["user"]
        address = data["address"]
        role = user.role
        console.log('user: ', user)
        console.log('address: ', address)
        console.log('role: ', role)
        if (user != null) {
            res.render('admin/profile', {
                user: user,
                address: (address != null && address != undefined )? address : null
            })
        } else {
            req.flash('error', `Error in retrieving user profile`)
            res.render('admin/profile', {
                user: null,
                address: null
            })
        }
    })
    .catch(err => {
        req.flash('error', `Error in accessing user service: ${err}`)
        res.render('admin/profile', {
            user: null,
            address: null
        })
    })
    
});

module.exports = router;