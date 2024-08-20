### Web APIs 

Our browsers provide us `Web APIs`, similar to how Node with the `Chrome V8 Engine` provides us the `JS bindings` to `libuv`.  This allows JavaScript to be single-threaded yet non-blocking.

When we use `setTimeout`, this is part of the `Web APIs` where it uses `Timers`.  This means the invocation is not added to the top of our `Call Stack`, instead the `Web API` will be responsible for the delay.  When the delay is reached, then the `callback` function is pushed to the `Callback Queue`.  Only when the `Call Stack` is empty, will our `Event Loop` check the `Callback Queue` for entries.  It will then push the callback function to the `Call Stack` so it can be executed.  Once the callback completes, then it is popped off the `Call Stack`.