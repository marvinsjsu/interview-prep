### Asynchronous 

Allows our application to work on multiple tasks at the same time.  These asynchronous functions run in the background. Node is really good at this - it is event-driven.  This is opposite of code being executed line-by-line (synchronous - blocking code). File-system and network operations are asynchronous.

#### Asynchronous Callbacks

Callbacks are functions that are passed to other functions.  An example is using the `setInterval` function, which expects a function as its first argument and a duration in milliseconds as its second.

```
setInterval(() => console.log(`I'm a callback`), 1000);
```

The callback function is executed after every 1000 milliseconds has passed.

These `callbacks` allow our code to execute tasks after an event has happened.  Another example is opening and reading a file, this task can take some time and so we pass a `callback` to the function so when the function completes its task, the `callback` is executed; in this case, possibly processing the contents of the file.

#### Non-blocking Input and Output functions 
Asynchronous functions can run in parallel with other code.  This is possible because the CPU will delegate the work to other devices, which allows the CPU to work on other tasks at the same time.

##### JavaScript is synchronous, but Node gives us the APIs that support asynchronicity.

#### Multi-Threading, Processes, and Threads

Our JavaScript code lives in the memory of a process. When we invoke `setTimeout` or `setInterval`, this creates a new `thread`.  This `thread` will still live in the same process, but it will have it's own `call stack`.  If there were two `setInterval` invocations, then we would have two threads in the same process.  The CPU will switch back and forth between the threads to appear like it's processing both in parallel.  When we have multiple CPUs, we can dedicate a thread to a CPU.  The threads will be independent of each other.

JavaScript doesn't handle multithreading which avoids having to deal with managing shared data between multiple threads, race-conditions, and deadlocks. Node gives us one main thread to run our JS code, but we are given the `Event Loop`, thanks to `libuv`.

`libuv` gives us a `thread pool`.  There's the `main thread` that executes V8 and the `Event Loop`, then `4 more threads` readily available to take on work throughout the lifecycle of our Node process. `libuv` is smart, in that it will use the operating system as much as possible, so the use of the `thread pool` is minimized (since it's a limited resource) - whenever the operating system can do a task, `libuv` will just send the task to it.

##### As a Node developer, we don't have to worry about managing multiple threads, we let Node/libuv to handle this for us. This is why Node has non-blocking I/O.
