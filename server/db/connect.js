
/**
 * @file Creates a connection to postgres database.
 * @this DatabaseConnect
 * @exports db
 * 
 * @author Sanjay Sharma
 */
const dbConfig = require("../config/config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,
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

db.user = require("../model/user.js")(sequelize, Sequelize);
db.item = require("../model/item.js")(sequelize, Sequelize);


module.exports = db;
