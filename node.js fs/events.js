let EventEmitter = require('events')

let emitter = new EventEmitter()
console.log(emitter._events)

emitter.on('registraion2', (name) => {
    console.log('ok registraion')
    console.log(name)
})


const registraionFunc = () => {
    console.log('registraion')
}

emitter.on('registraion', registraionFunc)
emitter.removeListener('registraion', registraionFunc)


emitter.emit('registraion', 'Sam')

const authorizationFunc = () => {
    console.log('authorization')
}

emitter.addListener('authorization', authorizationFunc)

emitter.emit('authorization')
emitter.removeListener('authorization', authorizationFunc)
emitter.emit('authorization')
emitter.removeAllListeners()
emitter.emit('registraion', 'Sam')
emitter.emit('registraion2', 'Sam')

const onceFunc =(() => {
    console.log('once')
})

emitter.once('once', onceFunc)
emitter.removeListener('once', onceFunc)
emitter.emit('once')

emitter.emit('once')





