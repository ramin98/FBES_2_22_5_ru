const fsAsync = require('fs').promises
const fs = require('fs')

let idUser = 1

const createChat = async (from, to) => {
    try{
        console.log(fs.readdirSync('./data').includes(`${from}-${to}.json`))
        if(fs.readdirSync('./data').includes(`${from}-${to}.json`)){
            let chat = await fsAsync.readFile(`./data/${from}-${to}.json`)
            console.log(chat.toString())
        }else{
            fsAsync.writeFile(`./data/${from}-${to}.json/`,'[]')
        }
    }catch(err){
      console.log(err)
    }
    
}

createChat('Samir', 'Yasin')

const fromUser = async (from, to, message, date) => {
    try{
        idUser++
        console.log(fs.readdirSync('./data').includes(`${from}-${to}.json`))
        if(fs.readdirSync('./data').includes(`${from}-${to}.json`)){
            let chat = await fsAsync.readFile(`./data/${from}-${to}.json`)
            let parsedChat = JSON.parse(chat)
            let messageObject = {
                fromUser: from,
                toUser: to,
                userMessage: message,
                messageDate: date,
                id: idUser
            }
            console.log(parsedChat)
            parsedChat.push(messageObject)
            let stringifyedChat = JSON.stringify(parsedChat)
            fsAsync.writeFile(`./data/${from}-${to}.json/`, stringifyedChat)
        }else{
            console.log('There is no such chat')
        }
    }catch(err){
      console.log(err)
    }
    
}


const toUser = async (from, to, message, date) => {
    idUser++

    try{
        console.log(fs.readdirSync('./data').includes(`${from}-${to}.json`))
        if(fs.readdirSync('./data').includes(`${from}-${to}.json`)){
            let chat = await fsAsync.readFile(`./data/${from}-${to}.json`)
            let parsedChat = JSON.parse(chat)
            let messageObject = {
                fromUser: from,
                toUser: to,
                userMessage: message,
                messageDate: date,
                id: idUser
            }
            parsedChat.push(messageObject)
            let stringifyedChat = JSON.stringify(parsedChat)
            fsAsync.writeFile(`./data/${from}-${to}.json/`, stringifyedChat)
        }else{
            console.log('There is no such chat')
        }
    }catch(err){
      console.log(err)
    }
    
}

fromUser('Samir', 'Yasin', 'Hello',  new Date())
// fromUser('Samir', 'Yasin', 'Hello',  new Date())
// fromUser('Samir', 'Yasin', 'Hello',  new Date())
// fromUser('Samir', 'Yasin', 'Hello',  new Date())
// fromUser('Samir', 'Yasin', 'Hello',  new Date())