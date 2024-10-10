const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const sequelize = require('./config/database');
const userRoutes = require('./routes/userRoutes');

const path = require('path');

const app = express();

// Мидлвары
app.use(bodyParser.json());
app.use(cors());
app.use(express.static('public'));  // Отдача статики
app.use('/api', userRoutes);        // Подключаем маршруты для API

// Подключаем базу данных и запускаем сервер
sequelize.sync().then(() => {
  app.listen(3000, () => {
    console.log('Сервер запущен на http://localhost:3000');
  });
});
