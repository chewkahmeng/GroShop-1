const express = require('express');
var router = express.Router();
const authController = require("../controllers/auth.controller.js");
const bcrypt = require("bcrypt");
const db = require("../models");
const User = db.users;
const Employee = db.employees;
const Op = db.Sequelize.Op;
//middleware to read req.body.<params>

// router.post("/register", authController.registerUser);
router.post("/login", authController.loginUser);
router.put("/:id/update", authController.updateUser);
router.put("/:id/update/password", authController.changeUserPassword);
router.delete("/:id/delete", authController.deleteUser);
router.get("/:id", authController.retrieveUserDetails);

// by grace: if want to proceed with below method, replace this method in the auth.controller.
router.post('/register', async (req, res) => {
    console.log(req.body);
    const accountType = req.body['account-type'];
    const username = req.body.username
    const email = req.body.email
    const password = req.body.password
    const passwordConfirmation = req.body.passwordConfirmation
  
    if (accountType === 'user') {
        // Handle user login
        var success = false;
        if (passwordConfirmation !== password) {
            console.log("------> Password don't match!")
            res.status(400).send({
                message: "Password don't match!"
            })
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const userInDB = await User.findOne({
            where: {email: `${email}`}
        })
        if (userInDB) { 
            console.log("------> User already exists");
            res.redirect('/');
        } else {
            // Save user in the database
            const userToRegister = {
                username: username,
                password: hashedPassword,
                email: email
            };
            User.create(userToRegister)
                .then(data => {
                console.log ("--------> Created new User");
                res.redirect('/home');
                })
                .catch(err => {
                res.status(500).send({
                    message:
                    err.message || "Some error occurred while creating the User."
                });
            });
        } 
    } else if (accountType === 'employee') {
      // Handle employee login
      var success = false;
        if (passwordConfirmation !== password) {
            console.log("------> Password don't match!")
            res.status(400).send({
                message: "Password don't match!"
            })
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const employeeInDB = await Employee.findOne({
            where: {email: `${email}`}
        })
        if (employeeInDB) { 
            console.log("------> Employee already exists");
            res.redirect('/');
        } else {
            // Save Employee in the database
            const employeeInDB = {
                username: username,
                password: hashedPassword,
                email: email
            };
            Employee.create(employeeInDB)
                .then(data => {
                console.log ("--------> Created new Employee");
                res.redirect('/home');
                })
                .catch(err => {
                res.status(500).send({
                    message:
                    err.message || "Some error occurred while creating the Employee."
                });
            });
        } 
    }
});

module.exports = router;