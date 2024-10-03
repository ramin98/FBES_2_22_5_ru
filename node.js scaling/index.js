const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const sharedArray = require('./data')

let {fork} = require('child_process')

let app = express()

const HOST = 5000

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

let child1, child2;

// Функция для добавления объекта в общий массив
const addToArray = (data) => {
    sharedArray.push(data);
};

// Создаем дочерние процессы
child1 = fork('process-one.js', ['Child 1']);
child2 = fork('process-two.js', ['Child 2']);

// Обработка сообщений от дочерних процессов
child1.on('message', addToArray);
child2.on('message', addToArray);

// Запускаем таймер для дочерних процессов
setInterval(() => {
    child1.send({ type: 'add' });
    child2.send({ type: 'add' });
}, 1000);

// HTTP сервер для получения массива
app.get('/arr', (req, res) => {
    res.json(sharedArray)
})

app.listen(HOST, (err) => {
    if(err){
        console.log(err)
        return
    }
    console.log(`http://localhost:${HOST}`)
})
