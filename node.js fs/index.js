// setTimeout(() => {
//     console.log('2')
// })

// console.log('1')

// let arr = [1,2,3,4,5]

// Array.prototype.myForEach = function(callback) {
//     for (let index = 0; index < this.length; index++) {
//         callback(this[index])
//     }
// }
// arr.forEach((item) => {
//   console.log(item)
// })



// const mainFunc = (callback) => {
//      return callback
// }

// let result = mainFunc((callback) => callback)
// console.log(result(() => 'hello world'))

// let myPromise = new Promise((res, rej) => {
//     if(false){
//         res('hello')
//     }else{
//         rej('error')
//     }
// })

// myPromise
// .then((res) => console.log(res))
// .catch((err) => console.log(err))

// console.log('hello')

// fetch('https://jsonplaceholder.typicode.com/users')
// .then((res) => res.json())
// .then((data) => console.log(data))


// const myAsyncFunc = async () => {
//     let res = await fetch('https://jsonplaceholder.typicode.com/users')
//     let data = await res.json()
//     console.log(data)
// }

// myAsyncFunc()

// console.log('hello')


// console.log(5 * '5n')
// console.log(typeof NaN)
// console.log(typeof null)
// console.log('h' === 'h')
// console.log(Number())
// console.log(s)
// var s = 's'
// let p = new Promise((res,red) => res('hello'))
// let v = 'hello3'

// console.log(v)
// p.then((res) => console.log(res)) 
// setTimeout(() => console.log('hello2'))

// const rec = () => {
//     console.log(' BIG DATA')

//     setTimeout(rec, 5000);
// }
// rec()

// setInterval(() => {
//     console.log(' BIG DATA')
// }, 5000)

// let obj = {
//     name:'Sam',
//     address:'Baku'
// }

// let {name1, address1} = obj
// console.log(name1)
// console.log(address1)

// let numbers = [1,2,3,4,5]
// let [first, second, ...rest] = numbers
// console.log(first)
// console.log(rest)


let {result1, result2, result3} = require('./server')
let arr = require('./data')

// console.log(arr[0])
// arr.splice(0, 1)
// console.log(arr)
// arr.splice(1, 1)
// console.log(arr)


// console.log(result1(1,2))
// console.log(result2(1,2))
// console.log(result3(1,2))

const loadash = require('lodash')
const os = require('os')
const fs = require('fs').promises


// console.log(os.arch())
// console.log(os.userInfo())

// let data = fs.readFileSync('text.txt','utf-8')
// console.log(data)


// fs.readFile('text.txt','utf-8')
// .then((res) => console.log(res))
// .catch((err) => console.log(err))
Promise.allSettled([1,2.5,3,Promise.reject('ok')])
.then((res) => console.log(res))
.catch((err) => console.log(err))

const read =  async () => {
    let data1 = await fs.readFile('text1.txt','utf-8')
    console.log(data1)

    let data2 = await fs.readFile('text2.tx','utf-8')
    console.log(data2)

    let data3 = await fs.readFile('text3.txt','utf-8')
    console.log(data3)
}

read().then(() => console.log('ok'))


console.log('hello')
console.log('hello')
console.log('hello')
console.log('hello')
console.log('hello')


// let result = loadash.defaults({a:'Sam'}, {a:'Jack', b:'Samir'})

// console.log(result)
// let arr1 = loadash.difference([2, 1], [2, 3]);
// console.log(arr1)
