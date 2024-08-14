### Observer Pattern

This gives us a way to subscribe and unsubscribe an event handler to an Observable object.  It's
a similar idea to pub/sub in this sense.  Subscribers are event handlers that get data via the
Observable object.

#### Benefits
- helps us decouple our code so event handlers is distinct and outside of an observable object
- allows us to dynamically subscribe and unsubscribe handlers, meaning we can manage subscription
in runtime
- very useful for logging or sending analytics data related to events, like user-generated ones
- we are free to define 3 methods for an Observable object: `subscribe`, `unsubscribe`, and
`notify`

#### Gotchas
- in our `subscribe` method, we should check if the handler already exists in our array of
subscribers; this ensures that the event handler is executed once only (if this is the 
desired behavior), and it also allows us to easily unsubscribe the event handler
- 

