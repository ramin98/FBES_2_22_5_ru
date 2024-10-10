const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Маршруты для CRUD операций

// Создание пользователя
router.post('/users', userController.createUser);

// Получение всех пользователей
router.get('/users', userController.getAllUsers);

// Получение одного пользователя по id
router.get('/users/:id', userController.getUserById);

// Обновление пользователя
router.put('/users/:id', userController.updateUser);

// Удаление пользователя
router.delete('/users/:id', userController.deleteUser);

router.get('/products/:id', userController.getProductByUserId);


router.post('/product', userController.addProduct);


module.exports = router;
