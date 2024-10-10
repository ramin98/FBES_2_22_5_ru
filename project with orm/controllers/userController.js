const User = require("../models/User");
const Product = require("../models/Product");

User.hasMany(Product, { foreignKey: "userId" });
Product.belongsTo(User, { foreignKey: "userId" });

// Создание пользователя (Create)
const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await User.create({ name, email, password });
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: "Ошибка создания пользователя" });
  }
};

const addProduct = async (req, res) => {
  try {
    const { name, price, id } = req.body;
    console.log(name,price, id)

    const product = await Product.create({
      name: name,
      price: price,
      userId: parseInt(id) // Здесь указываем userId
    });
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ error: "Ошибка создания продукта" });
  }
};

const getProductByUserId = async (req, res) => {
  try {
    // Получаем пользователя с его товарами
    const userWithProducts = await User.findOne({
      where: { id: req.params.id },
      include: Product, // Используем include для загрузки связанных товаров
    });

    if (userWithProducts) {
      console.log(`Товары пользователя ${userWithProducts.name}:`);
      res.json(userWithProducts.Products);
    } else {
      console.log(`Пользователь с ID ${req.params.id} не найден`);
    }
  } catch (error) {
    console.error("Ошибка при получении товаров:", error);
  }
};

// Получение всех пользователей (Read)
const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: "Ошибка получения пользователей" });
  }
};

// Получение одного пользователя по id (Read)
const getUserById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ error: "Пользователь не найден" });
    }
  } catch (error) {
    res.status(500).json({ error: "Ошибка получения пользователя" });
  }
};

// Обновление пользователя (Update)
const updateUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await User.findByPk(req.params.id);
    if (user) {
      user.name = name || user.name;
      user.email = email || user.email;
      user.password = password || user.password;
      await user.save();
      res.status(200).json(user);
    } else {
      res.status(404).json({ error: "Пользователь не найден" });
    }
  } catch (error) {
    res.status(500).json({ error: "Ошибка обновления пользователя" });
  }
};

// Удаление пользователя (Delete)
const deleteUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (user) {
      await user.destroy();
      res.status(200).json({ message: "Пользователь удален" });
    } else {
      res.status(404).json({ error: "Пользователь не найден" });
    }
  } catch (error) {
    res.status(500).json({ error: "Ошибка удаления пользователя" });
  }
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  deleteUser,
  updateUser,
  getProductByUserId,
  addProduct,
};
