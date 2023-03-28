const express = require('express');
var router = express.Router();
const authController = require("../controllers/auth.controller.js");
const bcrypt = require("bcrypt");
const User = require("../models/user.model.js");
const Employee = require("../models/employee.model.js");
//middleware to read req.body.<params>

//router.post("/register", authController.registerUser);
router.post("/login", authController.loginUser);
router.put("/:id/update", authController.updateUser);
router.put("/:id/update/password", authController.changeUserPassword);
router.delete("/:id/delete", authController.deleteUser);
router.get("/:id", authController.retrieveUserDetails);

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
        User.findByEmail(email, (err, result) => {
            if (err) console.log (err) // maybe change this line for better error handling 
            console.log("------> Search Results")
            console.log(result)
            if (result !== null) {
                console.log("------> User already exists")
                res.redirect('/', '302')
            } else {
                var newUser = new User({
                    username: username,
                    password: hashedPassword,
                    email: email
                });
                User.create(newUser, (err, result) => {
                    if (err) throw (err)
                    console.log ("--------> Created new User")
                    success = true;
                    res.redirect('/home', '302')
                })
            }
        });
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
        Employee.findByEmail(email, (err, result) => {
            if (err) console.log (err) // maybe change this line for better error handling 
            console.log("------> Search Results")
            console.log(result)
            if (result !== null) {
                console.log("------> User already exists")
                res.redirect('/', '302')
            } else {
                var newEmployee = new Employee({
                    username: username,
                    password: hashedPassword,
                    email: email
                });
                Employee.create(newEmployee, (err, result) => {
                    if (err) throw (err)
                    console.log ("--------> Created new Employee")
                    success = true;
                    res.redirect('/home', '302')
                })
            }
        });
    }
  });

module.exports = router;