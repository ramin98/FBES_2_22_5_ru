const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

let app = express()

const HOST = 5000

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))


let goods = require('./data')
let id = 1
goods = goods.map((item) => ({...item,id: id++}))

app.get('/goods', (req, res) => {
    res.send(goods).sendStatus(200)
})

app.get('/goods-filter', (req, res) => {
    console.log(req.query.input, 'input')
    console.log(req.query.select, 'select')
    if (!req.query.input || !req.query.select) {
        res.sendStatus(404)
    } else {
        let filteredData = goods.filter((item) => item.product_name.startsWith(req.query.input) &&
        item.store_name.startsWith(req.query.select))
        res.json(filteredData).status(200)
    }

})

app.patch('/change-cheked/:id', (req, res) => {
    console.log(req)
    console.log(req.body.checked)
    let elementIndex = goods.findIndex((item) => item.id == req.params.id)
    goods[elementIndex].checked = !req.body.checked
    console.log(goods[elementIndex])
})

app.delete('delete-all', (req, res) => {

})

app.listen(HOST, (err) => {
    if (err) {
        console.log(err)
        return
    }
    console.log(`http://localhost:${HOST}`)
})



