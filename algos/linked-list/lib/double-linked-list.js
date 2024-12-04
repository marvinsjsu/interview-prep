const Node = require('./node');

class DoubleLinkedList { 
  constructor() { 
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  addNode(val) { 
    const newNode = new Node(val);

    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else { 
      this.tail.next = newNode;
      newNode.prev = this.tail;
      this.tail = newNode;
    }

    this.length++;
  }

  fromArray(values) { 
    values.forEach((val) => this.addNode(val));
  }

  toArray(head = null) { 
    const output = [];

    let curr = head || this.head;
        
    while (curr) { 
      output.push(curr.value);
      curr = curr.next;
    }

    return output;
  }  

}


module.exports = DoubleLinkedList;
