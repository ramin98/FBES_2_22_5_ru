const fsAsync = require('fs').promises
const fs = require('fs')

// const asyncReadFunc = async () => {
//     try{
//         let data = await fsAsync.readFile('./text1.tx', 'utf-8')
//         console.log(data, 'async')
//     }catch(err){
//           console.log(err)
//     }finally{
//         console.log('finely')
//     }
// }

// fsAsync.readFile('./text1.txt', 'utf-8')
// .then((res) => console.log(res,'promise'))
// .catch((err) => console.log(err))

// asyncReadFunc()


// fs.readFile('./text1.txt', 'utf-8', (err, data) => {
//     if(err){
//         console.log(err)
//     }
//     console.log(data,'callback')
// })

// let text1 = fs.readFileSync('./text1.txt', 'utf-8')



// console.log(text1)


// fs.appendFileSync('./text1.txt', 'gdsgdsfdsfdf')

// fs.open('./text4.txt', 'w+', () => {
//     console.log('open')
// })

// fs.writeFileSync('./text5.txt', 'Hello')

// fs.stat('./text5.txt', (err, data) => {
//     console.log(data)
// })

let d = fs.readdirSync('./data')
console.log(d)