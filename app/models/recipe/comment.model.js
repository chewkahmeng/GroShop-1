// This Sequelize Model represents tbl_users table in MySQL database. 
// These columns will be generated automatically: 
// id, title, description, published, createdAt, updatedAt.

// https://sequelize.org/docs/v6/core-concepts/model-basics/

module.exports = (sequelize, Sequelize) => {
    const DataTypes = Sequelize.DataTypes;
    const Comment = sequelize.define("comment", {
        content: {
            type: DataTypes.STRING,
            allowNull: false
        },
        author: {
            type: DataTypes.STRING,
            allowNull: false
        },
        recipeId: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }
    // include the following if want to specify the DB table name
    , {
        tableName: 'tbl_comments'
      }
    );
    
    return Comment;
  };