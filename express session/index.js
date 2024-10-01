const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const session = require('express-session');


const app = express();
const HOST = 5000


app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:5500', // specify your frontend domain
    credentials: true // allow credentials (cookies)
}));

app.use(session({
    secret: '123', // Замените на свой секретный ключ
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Установите на true, если используете HTTPS
}));
  

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'))

app.get('/setcookie', (req, res) => {
    req.session.username = {username: 'Ramin'}
    
    console.log(req.session)
    console.log(req.session.username, req.session.password)
    res.send('session has been set');
});

app.get('/getcookie', (req, res) => {
    if (req.session) {
        console.log(req.session); // Проверка содержимого сессии
        // Используем res.json для возврата объекта
        console.log(req.sessionID)
        return res.json({
            username: req.session.username,
            password: req.session.password
        });
    } else {
        // Возврат статуса 404, если сессия не найдена
        return res.status(404).send('No session data found');
    }
});


app.listen(HOST, (err) => {
    if (err) {
        console.log(err)
        return
    }
    console.log(`http://localhost:${HOST}`)
})

