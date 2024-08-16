### Factory Pattern

This is the idea of using a function to help us generate objects for consistency with
regards to the shape and attributes of the properties and methods of the objects.

#### Benefits
- we avoid mistakes in creating new objects and keeps us DRY
- as mentioned before, we add consistency in terms of the object's shape, the
property attributes, and methods for all objects created by the function

#### Gotchas
- may not be memory efficient, because we're not taking advantage of the object
prototypes as we create new methods for each new object created.  The way 
around this is to define the factory function to generate a new instance
based on a class and then we will be making use of the `prototype`

- Note how `johnLee` has the method `getFullName`, while `mattFengthong` does
not.  It's because the latter will use `User` prototype to get the
`getFullName` method.  The prototype in the object is `__proto__`.

```
{
  johnLee: {
    id: 'f478c9bd-1375-49ac-8255-cf7814e394b0',
    firstName: 'John',
    lastName: 'Lee',
    fullName: 'John Lee',
    createdAt: 1723746657542,
    isVerified: false,
    getFullName: [Function: getFullName]
  },
  mattFengthong: User {
    firstName: 'Matt',
    lastName: 'Fengthong',
    fullName: 'Matt Fengthong',
    id: '6e9b59ba-5a6e-4d69-b308-acb303eee7f2',
    isVerified: false,
    createdAt: 1723746657542
  }
}

```


##### To generate unique UUIDs
- use `uuid` package and use `v4` for pseudo-random `uuid`s
