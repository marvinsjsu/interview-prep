
const Node = require('./node');

class LinkedList {
  constructor () {
    this.head = null;
    this.currNode = this.head;
  }

  appendNode (node) {
    if (!this.head) {
      this.head = node;
      this.currNode = this.head;
    } else {
      this.currNode.next = node;
      this.currNode = this.currNode.next;
    }
  }

  from (list) {
    list.forEach((val) => {
      const node = new Node(val);
      this.appendNode(node);
    });
  }

  fromLinkedList (head) {
    this.head = head;
    this.currNode = this.head;
  }

  toArray () {
    const list = [];
        
    let currNode = this.head;

    while (currNode) {
      list.push(currNode.data);
      currNode = currNode.next;
    }

    return list;
  }

  display () {
    let currNode = this.head;
    let hasCycle = false;
    let output = '';

    const nodesSeen = new Set();


    while (currNode && !hasCycle) {

      if (nodesSeen.has(currNode)) {
        hasCycle = true;
      } else {
        output += `${currNode.data} ==> `;
        nodesSeen.add(currNode);
    
        currNode = currNode.next;

        if (!currNode) {
          output += 'null';
        }
      }
    }

    console.log({ output }, `${hasCycle ? ' has a cycle' : ' has no cycle'}`);
  }

  addCycle (nodeVal1, nodeVal2) {
    let node1 = null;
    let node2 = null;

    let curr = this.head;

    while (curr) {
      if (curr.data === nodeVal1) {
        node1 = curr;
      }

      if (curr.data === nodeVal2) {
        node2 = curr;
      }

      curr = curr.next;
    }

    if (node1 && node2) {
      node1.next = node2;
      console.log(`Cycle added from ${node1.data} to ${node2.data}`);
    }
  }

  static displayLinkedList (head) {
    let output = '';
    let curr = head;
        
    while (curr) {
      output += `==> ${curr.data}`;
      curr = curr.next;
    }

    console.log(output);
  }
}


module.exports = LinkedList;
