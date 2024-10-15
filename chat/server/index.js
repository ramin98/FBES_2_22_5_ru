const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');

const cors = require('cors');
const pool = require('./db');

const app = express();
app.use(express.json());
app.use(bodyParser.json());

const SECRET_KEY = 'secret_key'
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
      origin: "http://localhost:5173",
      methods: ["GET", "POST","PUT"],
      allowedHeaders: ["Content-Type"],
      credentials: true
    }
  });
  
  app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST","PUT"],
    allowedHeaders: ["Content-Type"],
    credentials: true
  }));

// Обработка соединения
io.on('connection', (socket) => {
    console.log(`User connected: ${socket.id}`);

    // Обработка отправки сообщения
   // Обработка отправки сообщения
// Обработка отправки сообщения
socket.on('sendMessage', async ({ chatId, senderId, content }) => {
    const messageData = {
        chat_id: chatId,
        sender_id: senderId,
        content: content,
    };

    // Сохранение сообщения в базе данных
    await pool.query(
        'INSERT INTO messages (chat_id, sender_id, content) VALUES ($1, $2, $3)',
        [chatId, senderId, content]
    );

    // Отправка сообщения всем участникам чата
    io.to(chatId).emit('receiveMessage', messageData);
});

    // Обработка присоединения к чату
    socket.on('joinChat', (chatId) => {
        socket.join(chatId);
    });

    // Обработка отключения
    socket.on('disconnect', () => {
        console.log(`User disconnected: ${socket.id}`);
    });
});

// Регистрация пользователя
app.post('/register', async (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    
    try {
        const result = await pool.query(
            'INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *',
            [username, hashedPassword]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        res.status(400).send("Error registering user");
    }
});

// Логин пользователя
app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    console.log(username, password)
    try {
        const userResult = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
        const user = userResult.rows[0];

        if (user && await bcrypt.compare(password, user.password)) {
            const token = jwt.sign({ id: user.id }, SECRET_KEY);
            res.json({ token, user });
        } else {
            res.status(401).send("Invalid credentials");
        }
    } catch (error) {
        res.status(400).send("Error logging in");
    }
});

// Получение списка пользователей
app.get('/users', async (req, res) => {
    try {
        const result = await pool.query('SELECT id, username FROM users');
        res.json(result.rows);
    } catch (error) {
        res.status(400).send("Error fetching users");
    }
});

// Создание чата
// Создание чата между двумя пользователями
// Создание чата между двумя пользователями
// Создание чата между двумя пользователями
app.post('/chats', async (req, res) => {
    const {participants}  = req.body; // массив ID пользователей

    console.log(`Creating chat with participants: ${participants}`);
    const existingChatResult = await pool.query(
        'SELECT * FROM chats WHERE participants @> $1 AND participants @> $2',
        [participants.userId , participants.receiverId]
    );
    try {
        // Проверка на существование чата
      

        if (existingChatResult.rows.length > 0) {
            console.log(`Chat already exists with ID: ${existingChatResult.rows[0].id}`);
            return res.status(200).json(existingChatResult.rows[0]); // Возвращаем существующий чат
        }

        // Если чата нет, создаем новый
        const newChatResult = await pool.query(
            'INSERT INTO chats (participants) VALUES ($1) RETURNING *',
            [participants]  // Убедитесь, что это массив
        );

        console.log(`New chat created with ID: ${newChatResult.rows[0].id}`);
        res.status(201).json(newChatResult.rows[0]);
    } catch (error) {
        console.error("Error creating chat:", error);
        res.status(400).send("Error creating chat");
        if (existingChatResult.rows.length > 0) {
            console.log(`Chat already exists with ID: ${existingChatResult.rows[0].id}`);
            return res.status(200).json(existingChatResult.rows[0]); // Возвращаем существующий чат
        }
    }
});

// Получение сообщений для конкретного чата
app.get('/chats/:chatId/messages', async (req, res) => {
    const { chatId } = req.params;

    try {
        const result = await pool.query('SELECT * FROM messages WHERE chat_id = $1 ORDER BY timestamp ASC', [chatId]);
        res.json(result.rows);
    } catch (error) {
        res.status(400).send("Error fetching messages");
    }
});

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});