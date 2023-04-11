// This Sequelize Model represents tbl_Employees table in MySQL database. 
// These columns will be generated automatically: 
// id, title, description, published, createdAt, updatedAt.

// https://sequelize.org/docs/v6/core-concepts/model-basics/

module.exports = (sequelize, Sequelize) => {
  const DataTypes = Sequelize.DataTypes;
  const Employee = sequelize.define("Employee", {
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    role: {
      type: DataTypes.STRING,
      defaultValue: "ADMIN"
    }
  }
  // include the following if want to specify the DB table name
  , {
      tableName: 'tbl_employees'
    }
  );
  
  return Employee;
};