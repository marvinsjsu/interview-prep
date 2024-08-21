### Event Loop

This is how Node is able to do work!  It is made up of a `loop`, a `Call Stack`, a `Memory Heap`, a `Callback Queue` (aka `Event Queue` or `Message Queue`), and a `Micro-task Queue`.

In a browser, this is slightly different.  The `Event Loop` will have the `loop`, `Call Stack`, `Callback Queue`, `Micro-task Queue`, and the `Web API`.

#### The Loop
Initial execution on the first iteration of the loop:
- it will go through all `Timers` callbacks
- then go through `I/O Callbacks` to execute
- then `setImmediate` to execute
- then `close callbacks` (when closing a file or network connection, it executes the callback for that)

##### Event Loop Phases
- Timers: `setTimeout`, `setInterval`, `setImmediate`
- I/O Callbacks
- setImmediate (execute the callback ASAP, but is executed after all I/O callbacks are executed)
- close Callbacks

[Event Loop](https://nodejs.org/en/learn/asynchronous-work/event-loop-timers-and-nexttick)


#### `Call Stack`
When our JavaScript engine executes our code line-by-line, it will push functions on our `Call Stack`.

#### `Callback Queue` (aka `Event Queue` or `Message Queue` or `Task Queue`)


#### `Micro-task Queue` (aka `Job Queue`)
Has higher priority than the `Callback Queue`, so when the `Call Stack` is empty, the `event loop` will then check this, `Micro-task Queue`, then will check the `Callback Queue`.  This queue is dedicated to `Promises`.  This queue was added when `Promises` was added.


