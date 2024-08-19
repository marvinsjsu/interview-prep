
// This is an object literal definition of our observable

const observers = [];

const observable = {
    subscribe: (handler) => {
        if (!observers.includes(handler)) {
            observers.push(handler);
        }
    },
    unsubscribe: (handler) => [...observers].forEach((observer, index) => {
        if (observer === handler) {
            observers.splice(index, 1);
        }
    }),
    notify: (data) => observers.forEach(observer => observer(data)),
};

export default observable;
