const User = require("../models/user.model.js");
const Employee = require("../models/employee.model.js");
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
            res.redirect('302','/')
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
                res.redirect('302', '/home')
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

exports.updateUser = (req, res) => {
    // Validate Request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
    console.log(req.body);
  
    User.updateUsernameEmail(
      req.params.id,
      new User(req.body),
      (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found User with id ${req.params.id}.`
            });
          } else {
            res.status(500).send({
              message: "Error updating User with id " + req.params.id
            });
          }
        } else res.send(data);
      }
    );
  };

exports.changeUserPassword = async (req, res) => {
    // Validate Request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    console.log(req.body);
    const oldPassword = req.body.oldPassword;
    const newPassword = req.body.newPassword;
    const newPasswordConfirmation = req.body.newPasswordConfirmation;
    var success = false;

    if (newPasswordConfirmation !== newPassword) {
        console.log("------> Password don't match!")
        res.status(400).send({
            message: "Password don't match!"
        })
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    var updatedUser = new User({
        password: hashedPassword,
    });

    User.findById(
        req.params.id, async (err, result) => {
            console.log("finding user details for : " + req.params.id) ;
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found User with id ${req.params.id}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error retrieving User with id " + req.params.id
                    });
                }
            } else {
                const hashedOldPassword = result.password

                if (await bcrypt.compare(oldPassword, hashedOldPassword)) {
                    console.log("--------> Password change Successful")
                    res.send(`${result.username} changed password successfully`)
                    var updatedUser = new User({
                        username: result.username,
                        password: hashedPassword,
                    })

                    User.changePassword(
                        req.params.id,
                        updatedUser,
                        async (err, data) => {
                          if (err) {
                            if (err.kind === "not_found") {
                              res.status(404).send({
                                message: `Not found User with id ${req.params.id}.`
                              });
                            } else {
                              res.status(500).send({
                                message: "Error updating User with id " + req.params.id
                              });
                            }
                          }  else res.send(`Password changed successfully!`);       
                        }
                      );

                } else {
                    console.log("--------> Old Password incorrect")
                    res.send(`Old Password incorrect!`)
                }

            }
        }
    )
  };

exports.deleteUser = (req, res) => {
    User.deleteById(req.params.id, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found User with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Could not delete User with id " + req.params.id
          });
        }
      } else res.send({ message: `User was deleted successfully!` });
    });
  };


exports.retrieveUserDetails = (req, res) => {
    User.findById(req.params.id, (err, data) => {
       console.log("finding user details for : " + req.params.id) ;
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found User with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving User with id " + req.params.id
                });
            }
        } else res.send(data);
    });
  };
