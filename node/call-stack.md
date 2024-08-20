### Call Stack

Each time a function is invoked, it is pushed to the `Call Stack`.  When the function completes or returns a value, it is then popped off the `Call Stack`.  When we have functions inside a function, this means the inner functions will be pushed to the top of the `Call Stack`.

This is why we have to be careful with recursion because it can result in functions fully occupying or going beyond the space available in our `Call Stack` - `stack overflow`.

```
function recursionFn() {
    recursionFn();
}

recursionFn();
```