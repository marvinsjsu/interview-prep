### Prototype Pattern

This is about defining an object using the the `class` keyword, which creates an object
`prototype` that allows all instances of the class to refer to the same methods in the
`prototype`.

#### Benefits
- since we only have one copy of methods that live in the `prototype`, each object we
instantiate will not have to have duplicates of these methods and will instead just
refer to this through the `prototype chain`.

#### Gotchas
- harder to know where the method or property is coming from, especially if the 
prototype chain is long
