const express = require('express');
var router = express.Router();
const userController = require("../controllers/user.controller.js");
const middleware = require("../middleware/middleware.js")
// Include Express Validator Functions
const { check, validationResult } = require('express-validator');

//middleware to read req.body.<params>

router.get('/', middleware.isLoggedIn, userController.getUserProfile);

router.get("/:id/update", middleware.isLoggedIn, (req, res) => {
    res.render('user/maintainProfile', {
        mode: 'UE',
        user: req.user
    })
})
router.post("/:id/update", middleware.isLoggedIn, userController.updateUser);

router.get("/:id/changePassword", middleware.isLoggedIn, (req, res) => {
    res.render('user/maintainProfile', {
        mode: 'PW',
        user: req.user
    })
})
router.post("/:id/changePassword", 
    middleware.isLoggedIn, 
    userController.validatePasswordChange,
    (req, res, next) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            errors.array().forEach(err => req.flash('error', err.msg));
            return res.redirect(`/home/profile/${req.user.id}/changePassword`);
        }
        next()
    },
    userController.changeUserPassword
);

module.exports = router;