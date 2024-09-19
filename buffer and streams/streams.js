let fs = require('fs')

// let text =  fs.createReadStream('text.txt', 'utf-8')
// let toText = fs.createWriteStream('text1.txt')

// text.pipe(toText)


// let text = fs.createReadStream('text.txt', 'utf-8')

// text.on('end', () => {
//     console.log('end')
// })


text.on('data', (data) => {
    console.log(data)
    const writeStream = fs.createWriteStream('file.txt');
    writeStream.write(data);
    writeStream.end();
})

// text.on('error', (err) => {
//     console.log(err)
// })

let { Writable, Readable, Duplex } = require('stream')

// let readFileObj = new Readable({
//     read() {
//         this.push('HELLO')
//         this.push(null)
//     }
// })

// readFileObj.on('data', (data) => {
//     console.log(data.toString())
// })

// let writeFileObj = new Writable({
//     write(chunk, encoding, callback) {
//         console.log(encoding)
//         console.log(chunk.toString())
//         callback()
//     }
// })

// writeFileObj.write('helloread', () => {
//     console.log('ok')
// })


let duplexFileObj = new Duplex({
    read() {
        this.push('HELLO')
        this.push(null)
    },
    write(chunk, encoding, callback) {
        console.log(encoding)
        console.log(chunk.toString())
        callback()
    }
})

duplexFileObj.on('data', (data) => {
    console.log(data.toString())
    duplexFileObj.write(data.toString(), () => {
        console.log('write')
    })
})