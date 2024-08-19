### Observer Pattern

This gives us a way to subscribe and unsubscribe an event handler to an Observable object.  It's
a similar idea to pub/sub in this sense.  Subscribers are event handlers that get data via the
Observable object.

#### Benefits
- helps us decouple our code so event handlers is distinct and outside of an observable object;
helps with Separation of Concerns
- allows us to dynamically subscribe and unsubscribe handlers, meaning we can manage subscription
in runtime
- very useful for logging or sending analytics data related to events, like user-generated ones
- we are free to define 3 methods for an Observable object: `subscribe`, `unsubscribe`, and
`notify`

#### Gotchas
- in our `subscribe` method, we should check if the handler already exists in our array of
subscribers; this ensures that the event handler is executed once only (if this is the 
desired behavior), and it also allows us to easily unsubscribe the event handler
- may affect performance as observers may take time to execute or there are too many of
them
- when we define our object via object literal, if we want to reference `this` as in
the object that is created, we need to make sure we use the regular function 
definition and not arrow functions

#### Create a base Observable object or Observable class
- we can define an observable via object literal or via a class
- to instantiate from an object literal, we can use `const MyObservable = Object.assign({}, observable)`
- to instantiate from a class, we can use `const MyObservable = new Observable()`

#### `Object.create` vs. `Object.assign`
- `Object.create` takes in two arguments, the first is an object that becomes the prototype of the new object,
and the optional second argument is an object that defines property descriptors for the new object
   - this is very useful for prototypal inheritance; meaning the new object does not own the properties and
   methods that was passed as the argument in `Object.create`
   - the 2nd argument is an object with property descriptors like below; it gives us fine-grain controls of
   our object's properties

   ```
    // This is using observable base class as the new object's prototype
    const newObservable = Object.create(observable, {
        name: {
            value: 'Marvin Mante', // current value
            writable: true, // default is false - can be modified
            enumerable: true, // default is false - can appear in loops
            configurable: true, // default is false - can be deleted or reconfigured
        }
    });

   ```

- `Object.assign` takes two arguments, the first is the `target` object and second is the `source` object.
The `target` will get copies or be overwritten with properties and methods from the `source`.  This will
be done via shallow-copy, which means only the first-level properties are copied, anything that is
nested or any arrays will keep reference of the `source` object.  This means if we change the
values in a nested or array property, the changes will also happen in the `source` and
vice-versa.
    - this is viewed as a merge function

    ##### Shallow-copy vs Deep-copy
    - Shallow-copy creates a copy of only the first-level properties, then when it's a nested
    object or an array, it copies the reference in the source, which means changes to our new
    object may affect our source object
    - Deep-copy copies properties and methods and will be independent of the original object;
    which means that changes to the new object will not affect the original object


#### Regular Function vs Arrow Function

When we are defining a method in an object, we need to ask ourselves if it matters that the
`this` of the method needs to refer to the object or not.  Most likely, we care about this
and should use the regular function definition using the `function` keyword instead of
using an arrow-function.

A regular function's `this` is based on the method's invocation, which object is calling
this method.  We will typically use dot-notation to invoke the method, so what's left of
the `.` is the `this`.

An arrow function depends on lexically scope, which means that when and where the
function was defined is how the `this` is determined.  Often times we use arrow
functions as callbacks when we don't necessarily care what the `this` is and 
are more dependent on the values that get passed to the function as its 
argument.

```
    // The subscribe method will not work because the arrow function's `this` is not the
    // object, myObservable.  In this case, the `this` of the `subscribe` method is
    // most likely either `window` (if this is client-side or browser code) or it 
    // will be `global` (if this is in Node), or can just be `undefined` if we
    // are using `strict-mode`

    const myObservable = {
        subscribers: [],
        subscribe: (fn) => this.subscribers.push(fn),
    };

    // This works because the method is a regular function where the `this` is based on
    // when it is invoked.  We would invoke the method via dot-notation, like
    // myObservable2.subscribe(fn);
    // this means that the `this` is the object to the left of the dot-notation
    / invocation

    const myObservable2 = {
        subscribers: [],
        subscribe: function (fn) {
            this.subscribers.push(fn);
        },
    }
```

Another example of lexical scoping for an arrow function

```

// `getTruthiness` method will return a new function that when invoked
// will return the truthiness of the object based on its `val1` and
// `val2` properties.  The returned arrow function will have a this
// based on lexical scope of when and where it was defined
// (not when executed in runtim).  So in this example, 
// since the arrow function is inside regular 
// function that has a `this` which is the
// `obj` object, then the `this` of the 
// arrow function is `obj`.

const obj = {
    val1: true,
    val2: true,
    getTruthiness: function () {
        return () => {
            console.log(`val1: ${this.val1}, val2: ${this.val2}`);
            return this.val1 && this.val2;
        }
    }
}

const truthyFn = obj.getTruthiness();
console.log(truthyFn()); // displays true

obj.val1 = false;

console.log(truthyFn()) // displays false
```

##### Remember that arrow functions are considered expressions and so are not hoisted ...
so these cannot be called before their definition.  Regular functions, on the other hand,
are hoisted.

```
// Function Declaration
console.log(hoistedFunction()); // Works because of hoisting
function hoistedFunction() {
  return 'Hello from hoisted function';
}

// Arrow Function
console.log(nonHoistedFunction()); // Error: nonHoistedFunction is not defined
const nonHoistedFunction = () => {
  return 'Hello from non-hoisted function';
};

```