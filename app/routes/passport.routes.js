// https://www.digitalocean.com/community/tutorials/easy-node-authentication-setup-and-local#displaying-user-and-secure-profile-page-views-profile-ejs
const middleware = require("../config/middleware.js")
const { check, validationResult } = require('express-validator')
const db = require("../models");


module.exports = function(app, passport) {
    app.get("/welcome", (req, res) => {
        var isAuthenticated;
        if (typeof req.user === 'undefined') {
            isAuthenticated = null
        } else {
            isAuthenticated = req.user
        }
        if (isAuthenticated === null) {
            res.render("welcome", {
                user: typeof req.user !== 'undefined'?req.user:null,
            });
        } else {
            res.redirect('/home')
        }
    });

    app.get("/home", middleware.isLoggedIn, (req, res) => {
        console.log(req.body)
        res.render('index', {
            user: typeof req.user !== 'undefined'?req.user:null
        })
    });



    app.get('/login', (req, res) => {res.redirect("/welcome")})
    app.post('/login', passport.authenticate('local', {
        successRedirect: '/home',
        failureRedirect: '/login',
        failureFlash: true
    }))

    app.get('/register', (req, res) => {res.render("register", {
        user: typeof req.user !== 'undefined'?req.user:null
    })})

    app.post('/register', 
        middleware.validateRegister, 
        (req, res, next) => {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                errors.array().forEach(err => req.flash('error', err.msg));
                return res.redirect('/register');
            }
            console.log("here")
            next()
        },
        passport.authenticate('local-signup', {
            successRedirect: '/home',
            failureRedirect: '/register',
            failureFlash: true
        })
    )

    app.post('/logout', function(req, res, next) {
        req.logout(function(err) {
            if (err) { return next(err); }
            res.redirect('/');
        });
    });

}

// route middleware to make sure a user is logged in
