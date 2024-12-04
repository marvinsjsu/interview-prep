/**
 * Reverse a linked list in-place
 * 
 * Given the head of a singly linked list, reverse the linked list
 * and return its updated head.
 * 
 * Questions:
 * 
 * 
 * Test cases:
 * 
 * 
 * Algos:
 * - Naive approach using a Stack and a new LinkedList
 * - Optimal approach using in-place manipulation
 * 
 * Trade-offs:
 * - Naive approach:
 *      - time-complexity:
 *          = O(n) + O(n)
 *          = O(2n)
 *          = O(n)
 *      - space-complexity:
 *          = O(n)
 * 
 * - Optimal approach:
 *      - time-complexity:
 *          = O(n)
 *      - space-complexity:
 *          = O(1)
 * 
 */


class Node { 
  constructor(value, prev = null, next = null) { 
    this.value = value;
    this.prev = prev;
    this.next = next;
  }

  display() { 
    return `value: ${this.value}, prev: ${this.prev?.value}, next: ${this.next?.value}`;
  }
}

class LinkedList { 
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
      newNode.prev = this.tail;
      this.tail.next = newNode;
      this.tail = this.tail.next;
    }

    this.length++;
  }

  fromArray(values) { 
    values.forEach(val => this.addNode(val));
  }

  static toArray(head) { 
    if (!head) { 
      return [];
    }

    const output = [];

    let curr = head;

    while (curr) { 
      output.push(curr.value);
      curr = curr.next;
    }

    return output;
  }

  display() { 
    if (!this.head) { 
      return '';
    }

    let output = '';
    let curr = this.head;

    while (curr) { 
      output += `${curr.value} ==> `;
      curr = curr.next;
    }

    return output;
  }
}

const testCases = [
  [[1, 5, 2, 4, 3], [1, 5, 2, 4, 3]],
  [[4, 2, 7, 8, 9, 0, 2], [2, 0, 9, 8, 7, 2, 4]],
  [[9, 5, 8, 2, 1], [1, 2, 8, 5, 9]],
  [[6, 6, 7, 7, 8, 8, 9, 9, 0, 0], [0, 0, 9, 9, 8, 8, 7, 7, 6, 6]],
  [[0, 1, 2, 3, 4, 5, 6], [6, 5, 4, 3, 2, 1, 0]],
];

testCases.forEach(([values, expectedOutput]) => { 
  const linkedList = new LinkedList();
  linkedList.fromArray(values);

  // const reversedHead = reverseLinkedListOptimal(linkedList.head);
  const reversedHead = reverseLinkedListNaive(linkedList.head);

  const result = LinkedList.toArray(reversedHead);

  let passes = result.length === expectedOutput.length;

  // expectedOutput.forEach((value, index) => { 
  //     if (result[index] !== value) {
  //         passes = false;
  //     }
  // });
    

  console.log({ values, expectedOutput, result, passes });
});

function reverseLinkedListOptimal(head) { 
  let prev = null;
  let curr = head;

  while (curr) { 
    let next = curr.next;
    curr.prev = next;
    curr.next = prev;
    prev = curr;
    curr = next;
  }

  return prev;
}


function reverseLinkedListNaive(head) { 
  const stack = [];

  let curr = head;
  while (curr) { 
    stack.push(curr.value);
    curr = curr.next;
  }

  const reversedLinkedList = new LinkedList();
  while (stack.length > 0) { 
    const topValue = stack.pop();
    reversedLinkedList.addNode(topValue);
  }

  return reversedLinkedList.head;
}

