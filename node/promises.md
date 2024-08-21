### Promises 

Added in ES2015 or ES6. This is an object that eventually return a value.  It can be in one of 3 states: `fulfilled`, `rejected`, `pending`.  This is the solution to the `Callback Pyramid of Doom`, which is what we get with deeply nested callbacks.  There's a lot of repetition of code.  With `Promises`, we can use `.then`, `.catch`, and `.finally` methods to handle data or errors.

```
const myPromise = new Promise((resolve, reject) => {
    if (true) {
        resolve('The promise worked and returned!');
    } else {
        reject('The promise failed!');
    }
});

myPromise
    .then(result => result)
    .then(result2 => console.log(result2))
    .catch(errorMsg => console.log(errorMsg))
    .finally(() => console.log('Our promise finally completed!'))
```

It matters where we put the `.catch`.  It will only catch errors from previous `.then`, any `.then`s that are after, then errors won't be caught.

### Async/Await
Added in ES8, which makes our asynchronous code look synchronous.  These are syntactic sugar for `Promises`.  We no longer need to chain `.then`s.

It's good practice to wrap our async/await in a try-catch block, because this is the way we can emulate the `.catch` method on a `Promise`.

### ES9 (ES2018)
- adds `object spread operator`, which is similar to `array spread operator`.

```
const objectToSpread = {
    objectId: 202,
    name: 'test object',
    description: 'using this as an example for object spread operator',
};

const { objectId, ...rest } = objectToSpread;
// objectId is 202
// rest is {
//    name: 'test object',
//    description: 'using this as an example for object spread operator',
// }
```

- adds `.finally` to `Promises`, which will usually not receive an argument.

- adds `for await of`, allows us to iterate an array of promises with `async/await`

```
const urls = [
    'https://jsonplaceholder.typicode.com/users',
    'https://jsonplaceholder.typicode.com/posts',
    'https://jsonplaceholder.typicode.com/albums',
];  

const getData2 = async () => {
    const fetchPromises = urls.map(url => fetch(url));

    for await (let request of fetchPromises) {
        const response = await request;
        const data = await response.json();
        console.log(data);
    }
}

getData2();
```

### Parallel vs Sequential vs Race 
- `Promise.all` for parallel async tasks (all promises must resolve, otherwise we need to add `.catch`)
- `Promise.race` for returning the returned value of the first async task that finishes
- use `await` for sequential execution of async tasks 

### ES2020
- adds `Promise.allSettled`, similar to `Promise.all`, but does not care about any rejected promises.  It will return an array with objects from the promises with `status` property and the `value` property (if resolved) or `reason` property` (if rejected).

### ES2021
- adds `Promise.any`, which resolves when any of the promises is resolved.  If none of the promises resolves, then it throws an error.



