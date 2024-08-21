const promise1 = new Promise((resolve, reject) => setTimeout(resolve, 3000));
const promise2 = new Promise((resolve, reject) => setTimeout(reject, 3000));

// When a promise is rejected in the Promise.all, it will throw an error.
// We need to catch this error like so.
Promise.all([promise1, promise2])
    .then(data => console.log(data))
    .catch(err => console.log('There was an error: ', err)); 
    


const promise3 = new Promise((resolve, reject) => setTimeout(resolve, 3000));
const promise4 = new Promise((resolve, reject) => setTimeout(reject, 5000));

// When we use Promise.allSettled, regardless of any promise being rejected,
// it will return an array with objects representing the Promise result
/* 
    [
    { status: 'fulfilled', value: undefined },
    { status: 'rejected', reason: undefined }
    ]
*/
Promise.allSettled([promise3, promise4])
    .then(data => console.log(data));



// Promise.race will either throw an error (if the reject happens first)
// or invoke the `.then` callback (if the resolve happens first)
const promise5 = new Promise((resolve, reject) => setTimeout(() => resolve('Success!'), 3000));
const promise6 = new Promise((resolve, reject) => setTimeout(() => reject('Failed!'), 5000));    

Promise.race([promise5, promise6])
    .then(console.log);
    