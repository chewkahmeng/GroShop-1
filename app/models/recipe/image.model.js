module.exports = (sequelize, DataTypes) => {
    const Image = sequelize.define("image", {
      type: {
        type: DataTypes.STRING,
      },
      name: {
        type: DataTypes.STRING,
      },
      srcPath: {
        type: DataTypes.STRING,
      },
    }  // include the following if want to specify the DB table name
    , {
        tableName: 'tbl_recipe_image'
      }
    );
    return Image;
};