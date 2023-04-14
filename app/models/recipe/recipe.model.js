// This Sequelize Model represents tbl_users table in MySQL database. 
// These columns will be generated automatically: 
// id, title, description, published, createdAt, updatedAt.

// https://sequelize.org/docs/v6/core-concepts/model-basics/
module.exports = (sequelize, Sequelize) => {
    const DataTypes = Sequelize.DataTypes;
    const Recipe = sequelize.define("recipe", {
      name: { 
        type: DataTypes.STRING,
        allowNull: false
      },
      description: {
        type: DataTypes.STRING
      },
      imageId: {
        type: DataTypes.INTEGER
      },
      cuisine: {
        type: DataTypes.STRING,
        // allowNull: false
      },
      prepTime: {
        type: DataTypes.INTEGER,
        // allowNull: false
      },
      prepTimeUom: {
        type: DataTypes.STRING,
        // allowNull: false
      }
    }
    // include the following if want to specify the DB table name
    , {
        tableName: 'tbl_recipe'
      }
    );
    
    return Recipe;
  };