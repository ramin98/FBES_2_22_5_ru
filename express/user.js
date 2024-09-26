const express = require('express')
let router = express.Router()

let users = [
    {userName:'Ramin Nasraddinzade', password:'1234', email:'ramin@gmail.com'},
    {userName:'Sam', password:'555', email:'Sam@gmail.com'},
    {userName:'Tom', password:'333', email:'Tom@gmail.com'},
    {userName:'Edward', password:'777', email:'Edward@gmail.com'},

]

router.get('/', (req, res) => {
    res.json(users)
})

module.exports = router