module.exports = (sequelize, DataTypes) => {
    const Ingredient = sequelize.define("ingredient", {
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      description: {
        type: DataTypes.STRING
      },
      amount: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      uom: { // unit of measurement
        type: DataTypes.STRING,
        allowNull: false
      },
      recipeId: { 
        type: DataTypes.STRING,
        allowNull: false
      }
    }  // include the following if want to specify the DB table name
    , {
        tableName: 'tbl_recipe_ingredient'
      }
    );
    return Ingredient;
};