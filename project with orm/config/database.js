const { Sequelize } = require('sequelize');

// Настройки соединения с PostgreSQL
const sequelize = new Sequelize('mydb', 'postgres', 'ramin1998', {
  host: 'localhost',
  dialect: 'postgres'
});

module.exports = sequelize;
