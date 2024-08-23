### Node Modules (default is CommonJS)

`require()` will read a file, execute it, and return its values.  This is our main way of being able to use existing and third-party modules.  Node modules allows us to organize our code in smaller files, provides encapsulation (we can hide or expose what we want to), improves re-usability.  It is set to look for JavaScript files, so we don't need to explicitly include the file extension when using `require`.

```
const test = require('./test');

console.log(require.extensions);
[Object: null prototype] {
  '.js': [Function (anonymous)],
  '.json': [Function (anonymous)],
  '.node': [Function (anonymous)]
}
```

In each JS file in our Node application, we have access to the `module` object.  This has properties like `path` (relative path), `loaded`, and `exports`, which is the way we can explicitly expose functions or values in the file so these are available to other JS modules that import these.

```
> console.log(module);
{
  id: '<repl>',
  path: '.',
  exports: {},
  filename: null,
  loaded: false,
  children: [],
  paths: [
    '/Users/marvinmante/Projects/js/interview-prep/node/examples/repl/node_modules',
    '/Users/marvinmante/Projects/js/interview-prep/node/examples/node_modules',
    '/Users/marvinmante/Projects/js/interview-prep/node/node_modules',
    '/Users/marvinmante/Projects/js/interview-prep/node_modules',
    '/Users/marvinmante/Projects/js/node_modules',
    '/Users/marvinmante/Projects/node_modules',
    '/Users/marvinmante/node_modules',
    '/Users/node_modules',
    '/node_modules',
    '/Users/marvinmante/.node_modules',
    '/Users/marvinmante/.node_libraries',
    '/Users/marvinmante/.nvm/versions/node/v20.15.0/lib/node'
  ]
}
```

Node will automatically cache modules, so a module is only executed once.  The modules live in `require.cache`. Setting a module's method to something else in another file will not affect the original module, but will execute the custom code in the file.

To import a Core Node module, we do ...
```
const { get } = require('node:https'); // CommonJS
import { get } from 'node:https'; // ES modules
```

Using `index.js` in a folder, allows us to treat the folder as a module.

// src/lib/index.js
```
module.exports = {
    ...require('./request'),
    ...require('./response),
}
```

// src/main.js
```
const { get, send } = require('./lib');  
```

#### Module vs Package
A package is a collection of modules.  It is re-usable and can be accessed through NPM.