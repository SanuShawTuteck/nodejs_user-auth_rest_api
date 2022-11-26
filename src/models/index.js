const Sequelize = require("sequelize");
const db = require(!process.env.NODE_ENV ? '../../config/dev.js' : '../../config/' + process.env.NODE_ENV+'.js');

db.User = require("./User")(db.sequelize, Sequelize);

module.exports = db;
