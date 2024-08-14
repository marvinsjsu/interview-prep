
// Classic class definition for an Observable
class Observable {
    constructor () {
        this.observers = [];
    }

    subscribe (handler) {
        if (!this.observers.includes(handler)) {
            this.observers.push(handler);
        }
    }

    unsubscribe (handler) {
        [...this.observers].forEach((observer, index) => {
            if (observer === handler) {
                this.observers.splice(index, 1);
            }
        });
    }

    notify (data) {
        this.observers.forEach(observer => observer(data));
    }
}

export default Observable;
