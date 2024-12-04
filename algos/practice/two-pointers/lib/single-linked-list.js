
const LinkNode = require('./link-node');

class SingleLinkedList { 
  constructor() { 
    this.head = null;
    this.tail = null;
  }

  addNode(value) { 
    const newNode = new LinkNode(value);

    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else { 
      this.tail.next = newNode;
      this.tail = newNode;
    }
  }

  fromArray(values) { 
    values.forEach(value => this.addNode(value));
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

  display(head = null) { 
    let output = '';

    let curr = head || this.head;
    while (curr) { 
      output += ` ${curr.value} ==>`;
      curr = curr.next;
    }

    return output;
  }    
}

module.exports = SingleLinkedList;
