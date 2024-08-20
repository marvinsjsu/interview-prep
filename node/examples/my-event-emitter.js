const EventEmitter = require('events');

class MyEventEmitter extends EventEmitter {};

const myEmitter = new MyEventEmitter();

myEmitter.on('test', (...args) => {
    console.log(`test event just happened, with args: ${args}`);
    console.log({ args });
});

myEmitter.emit('test', 'hello there', 'my name is calvin!');
