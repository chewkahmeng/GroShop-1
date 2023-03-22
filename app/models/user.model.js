const sql = require("./db.js");

// constructor
const User = function(user) {
  this.username = user.username;
  this.email = user.email;
  this.password = user.password;
};

User.create = (newUser, result) => {
  sql.query("INSERT INTO TBL_USERS SET ?", newUser, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created user: ", { id: res.insertId, ...newUser });
    result(null, { id: res.insertId, ...newUser });
  });
};

User.findByEmail = (email, result) => {
  let searchQuery = `SELECT * FROM TBL_USERS WHERE email = '${email}'`;
  sql.query(searchQuery, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found user: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found User with the email
    result({ kind: "not_found" }, null);
  });
};

module.exports = User;