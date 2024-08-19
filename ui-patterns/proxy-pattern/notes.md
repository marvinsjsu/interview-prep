### Proxy Pattern

This pattern allows us to modify behavior of the getter and setter of an object.

#### Benefits
- this is very helpful for adding validation, logging, formatting to our objects
- instead of directly interacting with the object itself, we access or modify
properties via the proxy instance and through the proxy instance, we are able
to customize how this all works
- JavaScript gives us `Proxy` object so we can easily do this.  It takes two
arguments, first is the object, then second is another object with `get` and
`set` methods.  `get` method expects two arguments, the `target` and the
`property name`.  `set` method expects 3 arguments, the `target`, the
`property name`, and the `value` to be set.

#### Gotchas
- with a Proxy, our handlers have a potential to affect get and set efficiency
and performance
- `set` method expects to return truthy, otherwise, setting the value will
result in an error, similar to `Error: 'set' on proxy: trap returned falsish for property 'username'`

#### Reflect.get and Reflect.set
- we want to use and return the Reflect static methods for expediency and readability, because
this reflects the original object's getter and setter's behavior

