/**
 * Dequeue methods:
 * - unshift
 * - shift
 * - push
 * - pop
 * - peekFront
 * - peekBack
 * - isEmpty
 * - toString
 * 
 */

class Node {
  constructor (value, prev = null, next = null) {
    this.value = value;
    this.prev = prev;
    this.next = next;
  }
}

class Dequeue {
  constructor () {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  unshift (value) {
    const newNode = new Node(value);

    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      newNode.next = this.head;
      this.head.prev = newNode;
      this.head = newNode;
    }

    this.length++;
  }
  shift () {
    if (!this.head) {
      return null;
    }

    const removed = this.head;

    if (this.head === this.tail) {
      this.head = null;
      this.tail = null;
    } else {
      this.head = removed.next;
      this.head.prev = null;
    }

    this.length--;

    return removed.value;
  }

  push (value) {
    const newNode = new Node(value);

    if (!this.tail) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail.next = newNode;
      newNode.prev = this.tail;
      this.tail = newNode;
    }

    this.length++;
  } 

  pop () {
    if (!this.tail) {
      return null;
    }

    const removed = this.tail;

    if (this.head === this.tail) {
      this.head = null;
      this.tail = null;
    } else {
      this.tail = removed.prev;
      this.tail.next = null;
    }

    this.length--;

    return removed.value;
  }

  peekFront () {
    return this.head
      ? this.head.value
      : null;
  }

  peekBack () {
    return this.tail
      ? this.tail.value
      : null;
  }

  isEmpty () {
    return this.length === 0;
  }

  toString () {
    if (this.length === 0) {
      return '[]';
    }

    let output = '[';
    let curr = this.head;

    while (curr) {
      output += ` ${curr.value},`;
      curr = curr.next;
    }

    output += ']';

    return output;
  }
}

// const testCases = [
//     [[1, 2, 3, 4], '[ 1, 2, 3, 4,]'],
//     [['a', 'b', 'c', 'd'], '[ a, b, c, d,]'],
// ];


// testCases.forEach(([values, expectedOutput]) => {
//     const dequeue = new Dequeue();
    
//     values.forEach((val) => dequeue.push(val));
    
//     const result = dequeue.toString();
//     const passes = result === expectedOutput;

//     console.log({ values, dequeue, result, expectedOutput, passes });
// });

module.exports = Dequeue;
