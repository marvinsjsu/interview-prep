/**
 * Reverse Linked List II
 * 
 * Given a singly linked list with n nodes and two positions, 
 * left and right, the objective is to reverse the nodes of 
 * the list from left to right. Return the modified list.
 * 
 * 
 * Questions:
 * - Will the left always be less than right?
 * 
 * Test cases:
 * - [6, 8, 7], 1, 2, [8, 6, 7]
 * - [9, 0, 8, 2], 2, 4, [9, 2, 8, 0]
 * - [1, 2, 3, 4, 5], 1, 5, [5, 4, 3, 2, 1]
 * - [7, 4, 6, 1, 5, 8], 2, 5, [7, 5, 1, 6, 4, 8]
 * - [0, 8, 3, 1, 9, 2], 1, 6, [2, 9, 1, 3, 8, 0]
 * 
 * 
 * Algos:
 * 
 * 
 * Trade-off:
 * 
 * 
 */

const SingleLinkedList = require('./lib/single-linked-list');
const Node = require('./lib/node');

function reverseLeftToRightNaive(head, left, right) { 
  let dummy = new Node(0);
  dummy.next = head;

  let prevStart = null;
  let prevEnd = null;
  let start = dummy;
  let end = dummy;

  let leftCounter = 0;
  while (start !== null && leftCounter < left) { 
    prevStart = start;
    start = start.next;
    leftCounter++;
  }

  let rightCounter = 0;
  while (end !== null && rightCounter <= right) { 
    prevEnd = end;
    end = end.next;
    rightCounter++;
  }

  const previous = reverseHelper(start, end);

  prevStart.next = previous;
  start.next = end;

  return dummy.next;
}

function reverseHelper(head, tail) { 
  let prev = null;
  let curr = head;
  let next = null;

  while (curr && curr !== tail) { 
    next = curr.next;
    curr.prev = next;
    curr.next = prev;
    prev = curr;
    curr = next;
  }

  return prev;
}

function reverseLeftToRightOptimal(head, left, right) {
  if (!head || left >= right) { 
    return head;
  }    

  const dummy = new Node(0);
  dummy.next = head;
  let prev = dummy;

  for (let i = 0; i < left - 1; i++) { 
    prev = prev.next;
  }

  let curr = prev.next;

  for (let i = 0; i < right - left; i++) { 
    const nextNode = curr.next;
    curr.next = nextNode.next;
    nextNode.next = prev.next;
    prev.next = nextNode;
  }

  return dummy.next;
}

const testCases = [
  [[6, 8, 7], 1, 2, [8, 6, 7]],
  [[9, 0, 8, 2], 2, 4, [9, 2, 8, 0]],
  [[1, 2, 3, 4, 5], 1, 5, [5, 4, 3, 2, 1]],
  [[7, 4, 6, 1, 5, 8], 2, 5, [7, 5, 1, 6, 4, 8]],
  [[0, 8, 3, 1, 9, 2], 1, 6, [2, 9, 1, 3, 8, 0]],
];

testCases.forEach(([values, left, right, expectedOutput]) => { 
  const linkedList = new SingleLinkedList();
  linkedList.fromArray(values);

  console.log(linkedList.display());

  // const reversedHead = reverseLeftToRightNaive(linkedList.head, left, right);
  const reversedHead = reverseLeftToRightOptimal(linkedList.head, left, right);
  console.log(SingleLinkedList.display(reversedHead), { left, right });

  const result = linkedList.toArray(reversedHead);

  let passes = result.length === expectedOutput.length;

  expectedOutput.forEach((value, index) => { 
    if (result[index] !== value) { 
      passes = false;
    }        
  });

  console.log({ values, left, right, expectedOutput, result, passes });

  console.log('+'.repeat(70));
  console.log('\n');
});

