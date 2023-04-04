const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')
const {body, validationResult} = require('express-validator')
const db = require("../models");
const userDB = db.users;
const employeeDB = db.employees;

function initialize(passport) {
    // =========================================================================
    // passport session setup ==================================================
    // =========================================================================
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session

    // serialize user for session
    passport.serializeUser((user, done) => done(null, { id: user.id, email: user.email }))

    //deserialize user
    passport.deserializeUser(async (login, done) => {
        console.log("deserialize [login]: " + login)
        try {
            const userInDB = await userDB.findOne({where: {email: `${login.email}`, id:`${login.id}`}});
            const employeeInDB = await employeeDB.findOne({where: {email: `${login.email}`, id:`${login.id}`}});
            if (userInDB !== null) {
                return done(null, userInDB)
            } else if (employeeInDB !== null) {
                return done(null, employeeInDB)
            } else {
                done(null, null);
            }  
        } catch (err) {
            console.log(err)
            done(err, null)
        }
    });

    // =========================================================================
    // LOCAL SIGNUP ============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
    const register = async (req, email, password, done) => {
        const accountType = req.body['account-type'];
        if (accountType === 'user') {
            // password validation
            if (password !== req.body.passwordConfirmation) {
                return done(null, false, { message: 'Passwords do not match!'})
            }
            // checking if user already exist as Employee
            const userByEmail = await userDB.findOne({where: {email: `${email}`}})
            const isEmployeeByEmail = await employeeDB.findOne({where: {email: `${email}`}});
            if (userByEmail !== null || isEmployeeByEmail !== null) {
                return done(null, false, { message: 'That email is already taken!'})
            }
            const userByUserName = await userDB.findOne({where: {username: `${req.body.username}`}})
            const isEmployeeByUserName = await employeeDB.findOne({where: {username: `${req.body.username}`}})
            if (userByUserName !== null || isEmployeeByUserName !== null) {
                return done(null, false, { message: 'That username is already taken!'})
            }

            // registering user
            const hashedPassword = await bcrypt.hash(password, 10)
            const newUser = {
                username: req.body.username,
                password: hashedPassword,
                email: email
            }
            userDB.create(newUser)
            .then(data => {
                console.log ("--------> Created new User");
                // console.log('data: ' + data);
                return done(null, data)
            })
            .catch(err => {
                return done(err)
            });
        } else if (accountType === 'employee') {
            // validation
            if (password !== req.body.passwordConfirmation) {
                return done(null, false, { message: 'Passwords do not match!'})
            }
            // checking if user already exist as Employee
            const employeeByEmail = await employeeDB.findOne({where: {email: `${email}`}})
            const isUserByEmail = await userDB.findOne({where: {email: `${email}`}})
            if (employeeByEmail !== null || isUserByEmail !== null) {
                return done(null, false, { message: 'That email is already taken!'})
            }
            const employeeByUserName = await employeeDB.findOne({where: {username: `${req.body.username}`}})
            const isUserByUserName = await userDB.findOne({where: {username: `${req.body.username}`}})
            if (employeeByUserName !== null || isUserByUserName !== null) {
                return done(null, false, { message: 'That username is already taken!'})
            }

            // registering employee
            const hashedPassword = await bcrypt.hash(password, 10)
            const newEmployee = {
                username: req.body.username,
                password: hashedPassword,
                email: email
            }
            employeeDB.create(newEmployee)
            .then(data => {
                console.log ("--------> Created new Employee");
                // console.log('data: ' + data);
                return done(null, data)
            })
            .catch(err => {
                return done(err)
            });
        } else {
            return done(null, false, { message: 'No account type given!'})
        }


        
    }
    passport.use('local-signup', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    }, register))

    // =========================================================================
    // LOGIN ============================================================
    // =========================================================================
    const login = async (req, email, password, done) => {
        console.log(req.body)
        const accountType = req.body['account-type'];
        if (accountType === 'user') {
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
        } else if (accountType === 'employee') {
            const employee = await employeeDB.findOne({
                where: {email: `${email}`}
            })
            if (employee == null) {
                return done(null, false, { message: 'Email/password incorrect.'})
            }
            try {
                if (await bcrypt.compare(password, employee.password)) {
                    return done(null, employee)
                } else {
                    return done(null, false, {message: 'Email/password incorrect.'})
                }
            } catch (e) {
                return done(e)
            }
        }
    } 
    passport.use(new LocalStrategy({usernameField: 'email', passReqToCallback: true}, login))
    

}

module.exports = initialize