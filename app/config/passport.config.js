const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')
const db = require("../models");
const userDB = db.users;

function initialize(passport) {
    // =========================================================================
    // passport session setup ==================================================
    // =========================================================================
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session

    // serialize user for session
    passport.serializeUser((user, done) => done(null, user.id))

    //deserialize user
    passport.deserializeUser(async (id, done) => {
        console.log("deserialize [id]: " + id)
        try {
            const userInDB = await userDB.findByPk(id);
            return userInDB ? done(null, userInDB): done(null, null);
        } catch (err) {
            console.log(err)
            done(err, null)
        }
    });

    // =========================================================================
    // LOCAL SIGNUP ============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
    const registerUser = async (req, email, password, done) => {
        if (password !== req.body.passwordConfirmation) {
            return done(null, false, { message: 'Passwords do not match!'})
        }
        const userByEmail = await userDB.findOne({where: {email: `${email}`}})
        if (userByEmail != null) {
            return done(null, false, { message: 'That email is already taken!'})
        }
        const userByUserName = await userDB.findOne({where: {username: `${req.body.username}`}})
        if (userByUserName != null) {
            return done(null, false, { message: 'That username is already taken!'})
        }
        const hashedPassword = await bcrypt.hash(password, 10)
        const newUser = {
            username: req.body.username,
            password: hashedPassword,
            email: email
        }
        console.log(email)
        userDB.create(newUser)
        .then(data => {
            console.log ("--------> Created new User");
            // console.log('data: ' + data);
            return done(null, data)
          })
          .catch(err => {
            return done(err)
          });
        
    }
    passport.use('local-signup', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    }, registerUser))

    // =========================================================================
    // LOGIN ============================================================
    // =========================================================================
    const authenticateUser = async (email, password, done) => {
        const user = await userDB.findOne({
            where: {email: `${email}`}
          })
        if (user == null) {
            return done(null, false, { message: 'Email/password incorrect.'})
        }
        try {
            if (await bcrypt.compare(password, user.password)) {
                return done(null, user)
            } else {
                return done(null, false, {message: 'Email/password incorrect.'})
            }
        } catch (e) {
            return done(e)
        }
    } 
    passport.use(new LocalStrategy({usernameField: 'email'}, authenticateUser))
    

}

module.exports = initialize