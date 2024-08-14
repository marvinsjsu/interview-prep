const database = {
    uri: 'mongodb+serv',
    connect: () => {
        console.log(`Connecting to db uri: ${this.uri}`);
    },
};

const databaseProxy = new Proxy(database, {
    get: (target, prop) => {
        return Reflect.get(target, prop);
    },
    set: (target, prop, value) => {
        if (prop === 'uri') {
            if (target.uri !== value) {
                // send a message to logs
                console.warn(`Database URI is being changed from ${target.uri} to ${value}!`);
            }
        }

        return Reflect.set(target, prop, value);
    },
});

databaseProxy.uri = 'mongodb+serv2';




