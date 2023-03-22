const User = require("../models/user.model.js");
const bcrypt = require("bcrypt");

// Register new user
exports.registerUser = async (req, res) => {
    // Validate Request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    console.log(req.body);
    const username = req.body.username
    const email = req.body.email
    const password = req.body.password
    const passwordConfirmation = req.body.passwordConfirmation

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


};

exports.loginUser = (req, res) => {
    const email = req.body.email
    const password = req.body.password

    console.log(req.body)
    User.findByEmail(email, async (err, result) => {
        if (err) throw (err) // maybe change this line for better error handling 
        console.log("------> Search Results")
        console.log(result)
        if (result === null) {
            console.log("--------> User does not exist")
            res.sendStatus(404)
        } else {
            // get hashed password from result
            console.log(result)
            const hashedPassword = result.password

            if (await bcrypt.compare(password, hashedPassword)) {
                console.log("--------> Login Successful")
                res.send(`${result.username} is logged in!`)
            } else {
                console.log("--------> Password incorrect")
                res.send(`Password incorrect!`)
            }
        }
    })
}