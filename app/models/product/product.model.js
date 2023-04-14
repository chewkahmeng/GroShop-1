module.exports = (sequelize, Sequelize) => {
    const DataTypes = Sequelize.DataTypes;
    const Product = sequelize.define("product", {
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
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      price: {
        type: DataTypes.FLOAT,
        allowNull: false
      },
    }
    // include the following if want to specify the DB table name
    , {
        tableName: 'tbl_product'
      }
    );
    
    return Product;
  };