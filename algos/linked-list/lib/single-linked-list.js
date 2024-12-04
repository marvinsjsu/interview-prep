
const Node = require('./node');

class SingleLinkedList { 
  constructor() { 
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  addNode(value) { 
    const newNode = new Node(value);

    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else { 
      this.tail.next = newNode;
      this.tail = newNode;
    }

    this.length++;
  }

  fromArray(values) { 
    values.forEach(val => this.addNode(val));
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

  display() {
    let output = 'head ==>';
    let curr = this.head;
    while (curr) { 
      output += ` ${curr.value} ==>`;
      curr = curr.next;
    }

    output += ' null';

    return output;
  }

  static display(head) { 
    let output = 'head ==>';
    let curr = head;
    while (curr) { 
      output += ` ${curr.value} ==>`;
      curr = curr.next;
    }

    output += ' null';

    return output;        
  }
}

module.exports = SingleLinkedList;
