
let instance = null;

class Counter {
    constructor (initVal) {
        if (instance) {
            process.emitWarning(`Counter instance already exists. Count is ${instance.count}`);
            return instance;
        }

        this.count = initVal || 0;
        instance = this;
    }

    increment () {
        this.count += 1;
        return this.count;
    }

    decrement () {
        this.count -= 1;
        return this.count;
    }
}

const counterInstance = Object.seal(new Counter());

export default counterInstance;
