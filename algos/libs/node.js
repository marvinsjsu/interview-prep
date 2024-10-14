class Node {
    constructor (data, next = null, prev = null) {
        this.data = data;
        this.prev = prev;
        this.next = next;
        this.value = data;
    }
}

module.exports = Node;
