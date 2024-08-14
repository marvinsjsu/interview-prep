### Singleton Pattern

This pattern ensures that there is only one instance of a class or object that is 
shared in the application.

#### Benefits
- this helps our application be memory efficient
- this is very useful for database connections, where we most often only need one instance
- by default, in ES2015 (aka ES6), modules are treated as Singletons, which means that when
a module is first imported, it is executed and exports ar
- by default, in CommonJS which is used in Node, modules are treated as Singletons, similar to ES6,
the modules are executed once when imported, then the exports are cached in `require.cache`

#### Gotchas
- since a Singleton instance can be shared all over the place in our app, we have to be careful
how our app changes its state

##### CommonJS vs ES2015 (aka ES6) modules
- very similar that it treats modules as Singletons
- CommonJS uses `module.exports` for exporting and `require()` for importing
- ES2015 uses `export` for exporting and `import` for importing
- the difference is that modules are executed synchronously in CommonJS, which means
we have to be careful when there are blocking calls
- also in CommonJS, `require()` is dynamic, meaning we can import modules during runtime, like in an
if-else block, with ES2015, this is not the case, imports are static
- and in CommonJS, we can omit the file extension, `.js` when we do `require` for a module

#### `Object.freeze` via `Object.seal`
- we want to use `Object.seal` instead of `Object.freeze` because all we want to do is make sure that we
cannot add or delete properties of the Singleton instance.  Otherwise, if we want the instance to be fully
immutable, we want to use `Object.freeze` which prevents adding, deleting, and modifying any properties
