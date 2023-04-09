module.exports = (sequelize, DataTypes) => {
    const Step = sequelize.define("step", {
      description: {
        type: DataTypes.STRING,
        allowNull: false
      },
      recipeId: { 
        type: DataTypes.STRING,
        allowNull: false
      }
    }  // include the following if want to specify the DB table name
    , {
        tableName: 'tbl_recipe_step'
      }
    );
    return Step;
};