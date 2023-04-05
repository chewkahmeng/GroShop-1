module.exports = (sequelize, Sequelize) => {
    const DataTypes = Sequelize.DataTypes;
    const Token = sequelize.define("token", {
      token: {
        type: DataTypes.STRING,
        allowNull: false
      }
    }
    // include the following if want to specify the DB table name
    , {
        tableName: 'tbl_tokens'
      }
    );
    
    return Token;
  };