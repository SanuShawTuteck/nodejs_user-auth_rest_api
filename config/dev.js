const Sequelize = require('sequelize');

const db = {}
db.Sequelize = Sequelize;
db.sequelize = new Sequelize('postgres', 'postgres', 'sanu1234', {
    host: 'localhost',
    dialect: 'postgres',
  
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
  
  });
  

module.exports = db;