// This Sequelize Model represents tutorials table in MySQL database. 
// These columns will be generated automatically: 
// id, title, description, published, createdAt, updatedAt.

// https://sequelize.org/docs/v6/core-concepts/model-basics/

module.exports = (sequelize, Sequelize) => {
  const DataTypes = Sequelize.DataTypes;
  const Tutorial = sequelize.define("tutorial", {
    title: {
      type: DataTypes.STRING
    },
    description: {
      type: DataTypes.STRING
    },
    published: {
      type: DataTypes.BOOLEAN
    },
    rating: {
      type: DataTypes.STRING
    }
  }
  // include the following if want to specify the DB table name
  , {
      tableName: 'tbl_tutorials'
    }
  );
    
  return Tutorial;
};