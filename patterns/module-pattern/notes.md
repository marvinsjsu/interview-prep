### Module Pattern

Support for built-in modules was introduced in ES2015.  A module is a file that contains JavaScript
where values are by default set as private, which helps with data encapsulation.

#### Benefits
- with data encapsulation, we are able to organize our project into smaller-sized modules by context
- this means we can manage what values or functions we want to expose and also helps prevents modification
- this helps us avoid polluting the global namespace and avoid naming collision
- this helps us with writing re-usable code

#### How to use
- when we use the `script` tag we can set the `type=module` attribute so the file is treated as a module
- when in Node, we can set `"type": "module"` in `package.json` or we can set the file extension as `.mjs`
- otherwise, we can use the old `module.exports` and `require` to import functions and values from modules