const sql = require("./db.js");
const helper = require("../config/helper.js");

// constructor
const Employee = function(user) {
  this.username = user.username;
  this.email = user.email;
  this.password = user.password;

  // For audit purpose
  this.created_by = user.username;
  this.created_dt = helper.getCurrDateTime();
  this.last_modified_by = user.username;

  if (!user.last_modified_dt) {
    this.last_modified_dt = helper.getCurrDateTime();
  } else {
    this.last_modified_dt = user.last_modified_dt;
  }
};

Employee.create = (userToCreate, result) => {
  sql.query("INSERT INTO TBL_EMPLOYEE SET ?", userToCreate, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created Employee: ", { id: res.insertId, ...userToCreate });
    result(null, { id: res.insertId, ...userToCreate });
  });
};

Employee.findByEmail = (email, result) => {
  let searchQuery = `SELECT * FROM TBL_EMPLOYEE WHERE email = '${email}'`;
  sql.query(searchQuery, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found employee: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found User with the email
    result({ kind: "not_found" }, null);
  });
};

Employee.updateUsernameEmail = (userId, userToUpdate, result) => {
    sql.query(
      "UPDATE TBL_EMPLOYEE SET username = ?, email = ?, last_modified_by = ?, last_modified_dt = ? WHERE userId = ?",
      [userToUpdate.username, userToUpdate.email, userToUpdate.username, userToUpdate.last_modified_dt, userId],
      (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found User with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated employee: ", { id: userId, ...userToUpdate });
      result(null, { id: userId, ...userToUpdate });
    });
}

Employee.changePassword = (userId, userToUpdate, result) => {
  sql.query(
    "UPDATE TBL_EMPLOYEE SET password = ?, last_modified_by = ?, last_modified_dt = ? WHERE userId = ?",
    [userToUpdate.password, userToUpdate.username, userToUpdate.last_modified_dt, userId],
    (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found User with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("updated employee: ", { id: userId, ...userToUpdate });
    result(null, { id: userId, ...userToUpdate });
  });
}

Employee.deleteById = (userId, result) => {
  let deleteQuery = `
    DELETE FROM TBL_EMPLOYEE WHERE userId = ${userId}`;
  
    sql.query(deleteQuery, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Employee with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("deleted employee: ", { id: userId });
      result(null, { id: userId });
    });
}

Employee.findById = (userId, result) => {
  let query = `SELECT * FROM TBL_EMPLOYEE WHERE userId = ${userId}`;
  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found tutorial: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Tutorial with the id
    result({ kind: "not_found" }, null);
  });
}


module.exports = Employee;