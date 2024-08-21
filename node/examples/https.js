const { request, get } = require('https');

const googleUrl = 'https://www.google.com';

const req = request(googleUrl, (res) => {
    res.on('data', (chunk) => {
        console.log(`Request was sent and received data chunk: ${chunk}`);
    });
    res.on('end', () => console.log('Request has been sent and response received.'));
});

// This is needed because it triggers sending the request
req.end();

// The other way we can do this is with `get`, which will
// automatically send the request when invoked
get(googleUrl, (res) => {
    res.on('data', (chunk) => {
        console.log(`GET request sent and received data chunk: ${chunk}`);
    });
    res.on('end', () => console.log('Request has been sent and response received.'));
});

