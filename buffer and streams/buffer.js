// let buffer1 = Buffer.alloc(1)
// console.log(buffer1)
// buffer1.write('1')
// console.log(buffer1)
// console.log(buffer1.toString())
// let buffer2 = Buffer.from('2')
// let result = Buffer.concat([buffer1, buffer2])
// console.log(result.toString())
// console.log(buffer1 > buffer2)


let fs = require('fs')

let emptyBuffer = Buffer.alloc(10)
let buffer1 = Buffer.from('Hanma Baki')
console.log(buffer1)
let result = buffer1.copy(emptyBuffer)
console.log(result)
console.log(emptyBuffer.toJSON())


fs.readFile('./Cat_November_2010-1a.jpg', (err, data1) => {
    if (err) throw err;

    fs.readFile('./FELV-cat.jpg', (err, data2) => {
        if (err) throw err;

        // Объединяем буферы изображений
        let result = Buffer.concat([data1, data2]);

        // Записываем объединенное изображение в файл
        fs.writeFile('./da.jpg', result, (err) => {
            if (err) throw err;
            console.log('Файл успешно сохранен!');
        });
    });
});
