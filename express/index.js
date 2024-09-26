const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const userRouter = require('./user')

let app = express()

const HOST = 5000

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

let users = [
    {userName:'Ramin Nasraddinzade', password:'1234', email:'ramin@gmail.com'},
    {userName:'Sam', password:'555', email:'Sam@gmail.com'},
    {userName:'Tom', password:'333', email:'Tom@gmail.com'},
    {userName:'Edward', password:'777', email:'Edward@gmail.com'},

]

// app.use((req, res, next) => {
//     if (true) {
//         next(new Error('Someth ig went wrong!')); // Передача управления обработчику ошибок
//     } else {
//         next(); // Продолжение нормального выполнения
//     }
// });

// // Обработчик ошибок
// app.use((err, req, res, next) => {
//     console.error(err.message);
//     res.json({err:err.message})
// });

// app.get('/e', (req, res) => {
//    console.log('hello')
// //    res.json({err:'err'})

// })


// app.use('/users', userRouter)



// app.get('/info', (req, res) => {
//     res.json({info:'HELLO'})
// })

app.get('/users', (req, res) => {
    res.json(users)
})

let user
const autho = (req, res, next) => {
    user = users.find((item) => item.password === req.body.password)
    if(user){
        next()
    }else{
        res.send('NO USER').status(401)
    }
}

const getData = (req, res, next) => {
    res.json(user)
    next()
}

const getData1 = (req, res) => {
    console.log('ok')
}


app.post('/autho', [autho, getData, getData1])

app.listen(HOST, (err) => {
    if(err){
        console.log(err)
        return
    }
    console.log(`http://localhost:${HOST}`)
})