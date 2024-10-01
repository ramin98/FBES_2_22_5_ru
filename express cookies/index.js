const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const app = express();
const HOST = 5000


app.use(cookieParser());
app.use(cors({
    origin: 'http://127.0.0.1:5500', // specify your frontend domain
    credentials: true // allow credentials (cookies)
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'))

app.get('/setcookie', (req, res) => {
    res.cookie('username', 'JohnDoe', {
        maxAge: 900000,
        httpOnly: true,
    });
    res.send('Cookie has been set');
});

app.get('/getcookie', (req, res) => {
    console.log(req.cookies)
    res.send(req.cookies['username']);
});

app.listen(HOST, (err) => {
    if (err) {
        console.log(err)
        return
    }
    console.log(`http://localhost:${HOST}`)
})