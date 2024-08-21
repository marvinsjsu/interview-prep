const myPromise1 = new Promise((resolve, reject) => {
    setTimeout(() => resolve('waited 2 seconds and now it is done!'), 2000);
    setTimeout(() => reject('Error just happened'), 3000);
});

// This will display after myPromise2, because the setTimeout for reject is 1 second    
// This will run .then callback, because resolve happens first, then it will show "Finally Done!"
myPromise1
    .then((data) => console.log(data))
    .catch((error) => console.log(error))
    .finally(() => console.log('Finally done!'));

    
const myPromise2 = new Promise((resolve, reject) => {
    setTimeout(() => resolve('waited 2 seconds and now it is done!'), 2000);
    setTimeout(() => reject('Error just happened'), 0);
});

// This will display first (before myPromise1)    
// This will run .catch callback, because reject happens first, then it will show "Finally Done!"
myPromise2
    .then((data) => console.log(data))
    .catch((error) => console.log(error))
    .finally(() => console.log('Finally done!'));

const fetchData = () => new Promise((resolve, reject) => {
    fetch('https://house-lydiahallie.vercel.app/api/listings')
        .then((res) => {
            if (!res.ok) {
                throw new Error(`Request failed! Http error: ${res.status}`);
            }

            return res.json();
        })
        .then((data) => resolve(data))
        .catch((error) => reject(error))
        .finally(() => console.log('Attempt to fetch is done!'))
});

//
fetchData()
    .then((data) => console.log(data))
    .catch((error) => console.log(error))
    .finally(() => console.log('Attempt to fetch is done!'))

const urls = [
    'https://jsonplaceholder.typicode.com/users',
    'https://jsonplaceholder.typicode.com/posts',
    'https://jsonplaceholder.typicode.com/albums',
];    

const getData = async () => {
    try {
        const [users, posts, albums] = await Promise.all(urls.map(url => {
            return fetch(url)
                .then(res => res.json());
        }));
    
        console.log('users:', users);
        console.log('posts:', posts);
        console.log('albums:', albums);
    } catch (error) {
        console.log('error: ', error);
    }
}

getData();

const getData2 = async () => {
    const fetchPromises = urls.map(url => fetch(url));

    for await (let request of fetchPromises) {
        const response = await request;
        const data = await response.json();
        console.log(data);
    }
}

getData2();