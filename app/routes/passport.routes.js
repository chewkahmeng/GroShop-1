const passportController = require("../controllers/passport.controller.js");
// https://www.digitalocean.com/community/tutorials/easy-node-authentication-setup-and-local#displaying-user-and-secure-profile-page-views-profile-ejs
module.exports = function(app, passport) {
    app.get("/", (req, res) => {
        res.render("welcome", {
            user: typeof req.user !== 'undefined'?req.user:null,
        });
    });

    app.get("/home", isLoggedIn, (req, res) => {
        console.log(req.body)
        res.render('index', {
            user: typeof req.user !== 'undefined'?req.user:null
        })
    });

    app.get('/profile', isLoggedIn, function(req, res) {
        res.render('profile', {
            user: req.user // get the user out of session and pass to template
        });
    });

    app.get('/login', (req, res) => {res.redirect("/")})
    app.post('/login', passport.authenticate('local', {
        successRedirect: '/home',
        failureRedirect: '/login',
        failureFlash: true
    }))

    app.get('/register', (req, res) => {res.render("register", {
        user: typeof req.user !== 'undefined'?req.user:null
    })})
    app.post('/register', passport.authenticate('local-signup', {
        successRedirect: '/home',
        failureRedirect: '/register',
        failureFlash: true
    }))

    app.post('/logout', function(req, res, next) {
        req.logout(function(err) {
            if (err) { return next(err); }
            res.redirect('/');
        });
    });

    // forgot password
    app.get('/forgot', function(req, res) {
        res.render('forgot');
    });
    app.post('/forgot', async (req, res, next) => {
        const requestPasswordResetController = await passportController.requestPasswordReset(req)
        res.redirect('/')
    })
    app.post('/reset/:token/:userId', async (req, res, next) => {
        const resetPasswordController = await passportController.resetPassword(
            req.body.userId,
            req.body.token,
            req.body.password
        )
        res.redirect('/home')
    })
    app.get('/reset/:token/:userId', (req, res) => {
        res.render('reset', {
            token: req.params.token,
            userId: req.params.userId
        })
    })
}

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}