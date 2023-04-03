// https://www.digitalocean.com/community/tutorials/easy-node-authentication-setup-and-local#displaying-user-and-secure-profile-page-views-profile-ejs
module.exports = function(app, passport) {
    app.get("/", (req, res) => {
        console.log("req.user is " + req.user);
        res.render("welcome", {
            isAuthenticated: req.isAuthenticated(),
            user: req.user,
        });
    });

    app.get("/home", isLoggedIn, (req, res) => {
        res.render('index', {
            isAuthenticated: typeof req.isAuthenticated() !== 'undefined'?true:false
        })
    });

    app.get('/profile', isLoggedIn, function(req, res) {
        res.render('profile.ejs', {
            user : req.user // get the user out of session and pass to template
        });
    });

    app.get('/login', (req, res) => {res.render("welcome")})
    app.post('/login', passport.authenticate('local', {
        successRedirect: '/home',
        failureRedirect: '/login',
        failureFlash: true
    }))

    app.get('/register', (req, res) => {res.render("register")})
    app.post('/register', passport.authenticate('local-signup', {
        successRedirect: '/home',
        failureRedirect: '/register',
        failureFlash: true
    }))

    app.post('/logout', function(req, res, next) {
        req.logout(function(err) {
            if (err) { return next(err); }
            res.redirect('/login');
        });
    });
}

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}