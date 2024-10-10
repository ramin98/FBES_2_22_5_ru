const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Product = sequelize.define('Product', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false
    }, userId: {  // Добавляем поле для внешнего ключа
        type: DataTypes.INTEGER,
        references: {
          model: 'Users',  // Название таблицы с пользователями
          key: 'id'        // Поле, на которое ссылается внешний ключ
        }, 
      }
  });

module.exports = Product;
