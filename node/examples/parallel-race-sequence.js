
const urls = [
    'https://jsonplaceholder.typicode.com/users',
    'https://jsonplaceholder.typicode.com/posts',
    'https://jsonplaceholder.typicode.com/albums',
];    

const parallelFetch = async () => {
    try {
        const fetchPromises = urls.map(url => fetch(url).then(res => res.json()));
        const [users, posts, albums] = await Promise.all(fetchPromises);

        return 'Parallel Fetch Done!';
    } catch (error) {
        console.error('Error in parallel fetching: ', error);
    }
}

const raceFetch = async () => {
    try {
        const fetchPromises = urls.map(url => fetch(url).then(res => res.json()));
        const data = await Promise.race(fetchPromises);

        return 'Race Fetch Done!';
    } catch (error) {
        console.error('Error in race fetching: ', error);
    }
}

const sequentialFetch = async () => {
    try {
        const fetchPromises = urls.map(url => fetch(url));
        let i = 0;
        for await (let request of fetchPromises) {
            const response = await request;
            const data = await response.json();

            console.log(`Request ${i} finished fetching: `);
            i++;
        }

        return 'Sequential fetching is done!';
    } catch (error) {
        console.error('Error in sequential fetching: ', error);
    }
}

raceFetch().then(console.log);
parallelFetch().then(console.log);
sequentialFetch().then(console.log);
