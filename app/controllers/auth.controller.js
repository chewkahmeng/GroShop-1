const bcrypt = require("bcrypt");
const db = require("../models");
const User = db.users;
const Op = db.Sequelize.Op;

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
};

exports.loginUser = async (req, res) => {
    const email = req.body.email
    const password = req.body.password
    console.log(req.body)

    const userInDB = await User.findOne({
      where: {email: `${email}`}
    })

    if (userInDB) { 
      console.log("------> User exists in DB: " + userInDB);
      const hashedPassword = userInDB.password;

      if (await bcrypt.compare(password, hashedPassword)) {
        console.log(`------> ${userInDB.username} is logged in!`)
      } else {
        console.log("--------> Password incorrect")
      }
      res.redirect('/home');
    } else {
      console.log("--------> User does not exist")
      res.sendStatus(404)
    }
}

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
  User.update({ username: req.body.username, email: req.body.email}, {
    where: {id : id}
  }).then(num => {
    if (num == 1) {
      res.send({message: "User was updated successfully."});
    } else {
      res.send({message: `Cannot update User with id=${id}. Maybe User is not found`});
    }
  }).catch(err => {
    res.status(500).send({
      message: "Error updating User with id=" + id
    });
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
  const newPassword = req.body.newPassword;
  const newPasswordConfirmation = req.body.newPasswordConfirmation;

  if (newPasswordConfirmation !== newPassword) {
      console.log("------> Password don't match!")
      res.status(400).send({
        message: "Password don't match!"
      })
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);

  const userInDB = await User.findOne({
    where: {id : id}
  });

  if (userInDB) {
    if (await bcrypt.compare(oldPassword, userInDB.password)) {
      // update password
      User.update({ password: hashedPassword}, {
        where: {
          id : id,
        }
      }).then(num => {
        if (num == 1) {
          res.send({message: "Password was updated successfully."});
        } else {
          res.send({message: `Cannot update password for User with id=${id}. Maybe User is not found`});
        }
      }).catch(err => {
        res.status(500).send({
          message: `Error updating User with id=${id}: ${err}`
        });
      });
    } else {
      console.log("--------> Old Password incorrect")
      // TODO: set redirect
    }
  } else {
    console.log("--------> User dont exist in DB")
    // TODO: set redirect
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


exports.retrieveUserDetails = (req, res) => {
  const id = req.params.id;
  User.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find User with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving User with id=" + id
      });
    });
  };
