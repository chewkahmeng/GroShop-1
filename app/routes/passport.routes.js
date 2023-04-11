// https://www.digitalocean.com/community/tutorials/easy-node-authentication-setup-and-local#displaying-user-and-secure-profile-page-views-profile-ejs
module.exports = function(app, passport) {
    app.get("/", (req, res) => {
        var isAuthenticated;
        if (typeof req.user === 'undefined') {
            isAuthenticated = null
        } else {
            isAuthenticated = req.user
        }
        res.render("welcome", {
            user: typeof req.user !== 'undefined'?req.user:null,
        });
    });

    app.get("/home", isLoggedIn, (req, res) => {
        console.log(req.body)
        if (req.user.constructor.name === 'Employee') {
            // if user is an employee, redirect to admin page
            res.render('admin', {
                user: typeof req.user !== 'undefined'?req.user:null
            })
          } else {
            //redirect to user page
            res.render('index', {
                user: typeof req.user !== 'undefined'?req.user:null
            })
          }
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
}

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}