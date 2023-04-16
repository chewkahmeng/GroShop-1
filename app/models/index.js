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

db.users = require("./user.model.js")(sequelize, Sequelize);
db.employees = require("./employee.model.js")(sequelize, Sequelize);
db.address = require("./address.model.js")(sequelize, Sequelize);
db.recipes = require("./recipe/recipe.model.js")(sequelize, Sequelize);
db.recipeImages = require("./recipe/image.model.js")(sequelize, Sequelize);
db.recipeImages.hasOne(db.recipes, {foreignKey: "imageId", constraints: false})
db.recipes.belongsTo(db.recipeImages, {foreignKey: "imageId", constraints: false})
db.recipeIngredients = require("./recipe/ingredient.model.js")(sequelize, Sequelize);
db.recipeSteps = require("./recipe/step.model.js")(sequelize, Sequelize);
db.favourites = require("./recipe/favourites.model.js")(sequelize, Sequelize);

db.recipes.hasOne(db.favourites, {foreignKey: "recipeId", constraints: false})
db.favourites.belongsTo(db.recipes, {foreignKey: "recipeId", constraints: false})

db.comments = require("./recipe/comment.model.js")(sequelize, Sequelize);
db.products = require("./product/product.model.js")(sequelize, Sequelize);
db.productImages = require("./product/image.model.js")(sequelize, Sequelize);
db.productImages.hasOne(db.products, {foreignKey: "imageId", constraints: false})
db.products.belongsTo(db.productImages)
db.adminAddress = require("./adminAddress.model.js")(sequelize, Sequelize);

module.exports = db;