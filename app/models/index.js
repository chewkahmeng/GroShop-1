const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: 0,
  dialectOptions: {
    typeCast: function (field, next) {
      if (field.type == 'DATETIME' || field.type == 'TIMESTAMP') {
        return new Date(field.string() + 'Z');
      }
      return next();
    }
  },
  timezone: '+08:00',
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.tutorials = require("./tutorial.model.js")(sequelize, Sequelize);
db.users = require("./user.model.js")(sequelize, Sequelize);
db.employees = require("./employee.model.js")(sequelize, Sequelize);
db.tokens = require("./token.model.js")(sequelize, Sequelize);
db.users.hasMany(db.tokens, {foreignKey: 'userId'})
db.tokens.belongsTo(db.users)

module.exports = db;