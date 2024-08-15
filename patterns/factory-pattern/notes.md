### Factory Pattern

This is the idea of using a function to help us generate objects for consistency with
regards to the shape and attributes of the properties and methods of the objects.

#### Benefits
- we avoid mistakes in creating new objects
- as mentioned before, we add consistency in terms of the object's shape, the
property attributes, and methods for all objects created by the function

#### Gotchas
- may not be memory efficient, because we're not taking advantage of the object
prototypes as we create new methods for each new object created


##### To generate unique UUIDs
- use `uuid` package and use `v4` for pseudo-random `uuid`s
