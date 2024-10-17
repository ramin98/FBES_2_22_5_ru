const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const xssClean = require("xss-clean");
const { body, validationResult } = require("express-validator");

const app = express();
const HOST = 5000;

app.use(cors());
app.use(xssClean());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const limiter1 = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 минут
  max: 10, // Лимит 10 запросов с одного IP
  headers: true, // Отображение информации о лимите в заголовках ответа
  // skip: (req, res) => {
  //     return req.ip === '::1'; // Игнорировать лимит для локального IP
  //   },
  handler: (req, res) => {
    res.status(429).json({
      error:
        "Вы превысили лимит запросов ONE. Пожалуйста, попробуйте снова через 15 минут.",
    });
  },
});

const limiter2 = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 минут
  max: 10, // Лимит 10 запросов с одного IP
  headers: true, // Отображение информации о лимите в заголовках ответа
  // skip: (req, res) => {
  //     return req.ip === '::1'; // Игнорировать лимит для локального IP
  //   },
  handler: (req, res) => {
    res.status(429).json({
      error:
        "Вы превысили лимит запросов TWO. Пожалуйста, попробуйте снова через 15 минут.",
    });
  },
});

// Применение лимитирования ко всем маршрутам
app.use("/one", limiter1);
app.use("/two", limiter2);

// Простой маршрут для демонстрации
app.get("/one", (req, res) => {
  console.log(req.ip);
  res.send("Привет! Это пример использования express-rate-limit.");
});

app.get("/two", (req, res) => {
  console.log(req.ip);
  res.send("Привет! Это пример использования express-rate-limit.");
});

app.post(
  "/register",
  // Валидация данных с помощью express-validator
  [
    body("username")
      .normalizeEmail()
      .isLength({ min: 5 })
      .withMessage("Имя пользователя должно содержать минимум 5 символов"),
    body("email")
      .normalizeEmail()
      .isEmail()
      .withMessage("Введите корректный email"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Пароль должен содержать минимум 6 символов"),
    body("confirmpassword").custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Пароли не совпадают");
      }
      return true;
    }),
  ],
  (req, res) => {
    // Получение результатов валидации
    console.log(req.body);
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      // Если есть ошибки в валидации, возвращаем их
      return res.status(400).json({ errors: errors.array() });
    }

    // Если ошибок нет, продолжаем обработку данных
    res.send("Регистрация успешна!");
  }
);

app.post(
  "/array",
  [
    body("tags").isArray().withMessage("Теги должны быть массивом"),
    body("tags.*").isString().withMessage("Каждый тег должен быть строкой"),
  ],
  (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      // Если есть ошибки в валидации, возвращаем их
      return res.status(400).json({ errors: errors.array() });
    }

    // Если ошибок нет, продолжаем обработку данных
    res.json({ text: "OK!" });
  }
);

app.listen(HOST, (err) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log(`http://localhost:${HOST}`);
});
