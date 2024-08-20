### Event Emitter

An implementation of the `Observer Pattern`.  Node has the `EventEmitter`, which will emit events to all of its subscribers, which means it will invoke subscribers which are callback functions.  This is part of the `events` module.

```
const EventEmitter = require('events');

class MyEventEmitter extends EventEmitter {}

const myEmitter = new MyEventEmitter();

myEmitter.on('eventName', (arg1, arg2) => {
    console.log(`An event just happened!`);
})

myEmitter.emit('eventName', arg1, arg2); // displays "An event just happened!

```

#### Observer Pattern
We have an object, call it `Observable`, where we can subscribe event handlers or `observers` to.  When an event happens, the `Observable` will notify all subscribers.  Typically, the observable object has 3 methods: `subscribe`, `unsubscribe`, and `notify`.  This pattern is a reliable way of decoupling our code, making it dynamic and flexible in terms of subscribing and unsubscribing event handlers.

### `process`
- instance of `EventEmitter`
- has `.on` method that takes an `event name` and a `callback`

```
process.on('exit', (code) => {
    console.log(`Process exit event with code: ${code}`);
});
```





