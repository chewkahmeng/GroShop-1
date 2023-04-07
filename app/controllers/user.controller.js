const bcrypt = require("bcrypt");
const db = require("../models");
const User = db.users;
const Address = db.address;
// Include Express Validator Functions
const { check, validationResult } = require('express-validator');

exports.validatePasswordChange = [
  check('password').isLength({ min: 8 }).withMessage('New Password Must Be at Least 8 Characters').matches('[0-9]').withMessage('New Password Must Contain a Number').matches('[A-Z]').withMessage('New Password Must Contain an Uppercase Letter')
  .custom((value,{req, loc, path}) => {
    if (value !== req.body.confirmPassword) {
        // trow error if passwords do not match
        throw new Error("New Password and Confirm New Password don't match");
    } else {
        return value;
    }
  })
  .trim().escape()
]

/*
// Register new user/employee
exports.register = async (req, res) => {
  console.log(req.body);
  const accountType = req.body['account-type'];
  const username = req.body.username
  const email = req.body.email
  const password = req.body.password
  const passwordConfirmation = req.body.passwordConfirmation

  if (accountType === 'user') {
      // Handle user registration
      var success = false;
      if (passwordConfirmation !== password) {
          console.log("------> Password don't match!")
          res.status(400).send({
              message: "Password don't match!"
          })
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const userInDBWithSameUsername = await User.findOne({where: {username: `${username}`}})
      const userInDBWithSameEmail = await User.findOne({where: {email: `${email}`}})
  
      if (userInDBWithSameUsername) { 
          console.log("------> User with this username already exists");
          res.render('welcome', {
            "error": "Register: User with this username already exists"
          });
        } else if (userInDBWithSameEmail) { 
          console.log("------> User with this email already exists");
          res.render('welcome', {
            "error": "Register: User with this email already exists"
          });
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
    // Handle employee registration
    var success = false;
      if (passwordConfirmation !== password) {
          console.log("------> Password don't match!")
          res.status(400).send({
              message: "Password don't match!"
          })
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const employeeInDBWithSameUsername = await Employee.findOne({where: {username: `${username}`}})
      const employeeInDBWithSameEmail = await Employee.findOne({where: {email: `${email}`}})
      if (employeeInDBWithSameUsername) { 
          console.log("------> Employee with this username already exists");
          res.render('welcome', {
            "error": "Register: Employee with this username already exists"
          });
        } else if (employeeInDBWithSameEmail) { 
          console.log("------> Employee with this email already exists");
          res.render('welcome', {
            "error": "Register: Employee with this email already exists"
          });
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
};
*/
/*
exports.login = async (req, res) => {
  const accountType = req.body['account-type'];
  const email = req.body.email
  const password = req.body.password
  console.log(req.body)
  if (accountType === 'user') {
    const userInDB = await User.findOne({
      where: {email: `${email}`}
    })

    if (userInDB) { 
      console.log("------> User exists in DB: " + userInDB);
      const hashedPassword = userInDB.password;

      if (await bcrypt.compare(password, hashedPassword)) {
        console.log(`------> ${userInDB.username} is logged in!`)
        res.redirect('/home');
      } else {
        console.log("--------> Password incorrect")
        res.render('welcome', {
          "error": "Login: Password incorrect"
        });
      }
      
    } else {
      console.log("--------> User does not exist")
      res.render('welcome','400', {
        "error": "Login: Email incorrect"
      });
    }
  } else if (accountType === 'employee') {
    const employeeInDB = await Employee.findOne({
      where: {email: `${email}`}
    })

    if (employeeInDB) { 
      console.log("------> Employee exists in DB: " + employeeInDB);
      const hashedPassword = employeeInDB.password;

      if (await bcrypt.compare(password, hashedPassword)) {
        console.log(`------> ${employeeInDB.username} is logged in!`)
        res.redirect('/home');
      } else {
        console.log("--------> Password incorrect")
        res.render('welcome', {
          "error": "Login: Password incorrect"
        });
      }
      
    } else {
      console.log("--------> Employee does not exist")
      res.render('welcome','400', {
        "error": "Login: Email incorrect"
      });
    }
  }
}
*/

exports.updateUser = (req, res) => {
  const id = req.params.id;
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
  console.log(req.body);

  // update username and/or email
  User.update({ username: req.body.username}, {
    where: {id : id}
  }).then(num => {
    if (num == 1) {
      req.flash('success', 'User details updated successfully.')
      res.redirect('/home/profile')
    } else {
      req.flash('error', 'User not found in database.')
      res.redirect(`/home/profile/${id}/update`)
    }
  }).catch(err => {
    req.flash('error', `Error occurred in saving user details: ${err}`)
    res.redirect(`/home/profile/${id}/update`)
  });
  };

exports.changeUserPassword = async (req, res) => {
  const id = req.params.id;
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
  console.log(req.body);
  const oldPassword = req.body.oldPassword;
  const newPassword = req.body.password;
  const newPasswordConfirmation = req.body.confirmPassword;

  if (newPasswordConfirmation !== newPassword) {
    req.flash('error', 'No user found in database')
    return res.redirect(`/home/profile/${id}/changePassword`) 
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);

  const userInDB = await User.findOne({where: {id : id}});
  if (userInDB) {
    if (await bcrypt.compare(oldPassword, userInDB.password)) {
      // update password
      User.update({ password: hashedPassword}, {
        where: {
          id : id,
        }
      }).then(num => {
        if (num == 1) {
          req.flash('success', 'Password changed successfully.')
          return res.redirect('/home/profile')
        } else {
          req.flash('error', 'No user found in database')
          return res.redirect(`/home/profile/${id}/changePassword`)        
        }
      }).catch(err => {
        req.flash('error', `Error occurred in saving new password: ${err}`)
        return res.redirect(`/home/profile/${id}/changePassword`)  
      });
    } else {
      req.flash('error', 'Old password is incorrect.')
      return res.redirect(`/home/profile/${id}/changePassword`) 
    }
  } else {
    req.flash('error', 'No user found in database')
    return res.redirect(`/home/profile/${id}/changePassword`)  
  }

};

exports.deleteUser = (req, res) => {
  const id = req.params.id;
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
  console.log(req.body);

  User.destroy({
    where: { id: id }
  })
  .then(num => {
    if (num == 1) {
      res.send({
        message: "User was deleted successfully!"
      });
    } else {
      res.send({
        message: `Cannot delete User with id=${id}. Maybe User was not found!`
      });
    }
  })
  .catch(err => {
    res.status(500).send({
      message: "Could not delete User with id=" + id
    });
  });
}


exports.getUserProfile = async (req, res) => {
  const user = await User.findByPk(req.user.id)
  const address = await Address.findOne({where: {userId: req.user.id}, order: [ ['createdAt', 'DESC']]})
  res.render('user/profile', {
    user: user, 
    address: address
  });
};
