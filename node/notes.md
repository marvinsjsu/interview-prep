### Node

This is a runtime environment built for JavaScript.  This has `global` object instead of `window`, which is what browsers provide us.

#### `argv`
A property on `process` that gives us an array of arguments.  The first element will always be the path of the Node process.  The second will be the path of the JavaScript file being executed.  The next elements will be additional command-line arguments.

```
> process.argv
[ '/Users/marvinmante/.nvm/versions/node/v20.15.0/bin/node' ]
```


#### Node vs JavaScript
JavaScript is a programming language which needs an engine like Chrome V8 so it can actually run on devices.  Node uses Chrome V8 engine to run JavaScript.  Node allows us to run JavaScript on the backend.  With Node, we get `global` which is what we can use to access things like `process` and `console.log`.

##### `global` vs. `window`
- Node gives us:
    - `global`
    - `process` 
    - `module` 
    - `__filename`
    - `__dirname`
    - `require()`

- Browsers give us:
    - `window`
    - `document`
    - `history`
    - `location`
    - `navigator`
    
Node is often used for running scripts, web applications, and web servers.

#### Node Internals
- V8 Engine (JavaScript Engine): will call Node APIs for additional functionalities
- Node.js APIS: uses bindings written in C++
    - `fs` 
    - `http`
    - `path`
    - `crypto`
- Node.js Bindings uses `libuv`, which deals with input/output tasks which then performs the task on the operating system.  This is written in C++.
- `libuv` abstracts operating system tasks

(Node on Github)[https://github.com/nodejs/node]
- `lib` is where modules like `fs` and `http` live
- `src` is where the C++ code lives where the `lib` modules bind to


##### LTS (Long-Term Support version)
- gives us developers time to use a stable version of Node
- even release numbers will be LTS (active and maintenance phase)
    - active means it being actively supported
    - maintenance means it will only receive bug fixes

##### REPL (Read Eval Print Loop)

(Node Release Schedule)[https://nodejs.org/en/about/previous-releases]