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


#### `Callback Queue` (aka `Event Queue` or `Message Queue` or `Task Queue`)


#### `Micro-task Queue`


