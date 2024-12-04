/**
 * Reverse Nodes in k-Group
 * 
 * The task is to reverse the nodes in groups of k in a given linked list,
 * where k is a positive integer, and at most the length of the linked
 * list. If any remaining nodes are not part of a group of k, they 
 * should remain in their original order.
 * 
 * Questions:
 * - Do we always start the group from the head of the linked-list?
 * - What should we return if k is 0 or negative?
 * - What should we return if the linked-list has no nodes?
 * - So k is the size of a set of nodes, if less we ignore?
 * 
 * Test cases:
 * - [1, 2, 3, 4, 5], 3, [3, 2, 1, 4, 5]
 * - [6, 8, 7], 1, [6, 8, 7]
 * - [8, 0, 6, 1, 0, 7, 8, 7, 5, 3, 5, 2, 4, 9], 3, [6, 0, 8, 7, 0, 1, 5, 7, 8, 2, 5, 3, 4, 9]
 * - [6, 6, 7, 7, 8, 8, 9, 9, 0, 0], 5, [8, 7, 7, 6, 6, 0, 0, 9, 9, 8]
 * - [3, 4, 7, 1, 3, 0, 6, 7, 2, 5, 7, 8, 9, 0, 6, 3, 7, 1, 4, 7, 8], 4, [1, 7, 4, 3, 7, 6, 0, 3, 8, 7, 5, 2, 3, 6, 0, 9, 7, 4, 1, 7, 8]
 * 
 * 
 * Algos:
 * 
 * 
 * Trade-offs:
 * 
 */

const DoubleLinkedList = require('./lib/double-linked-list');
const Node = require('./lib/node');

function reverseKGroups(head, k) {
  let dummy = new Node(0);
  dummy.next = head;
  let ptr = dummy;

  while (ptr !== null) { 
    let tracker = ptr;

    for (let i = 0; i < k; i++) { 
      if (tracker === null) { 
        break;
      }

      tracker = tracker.next;
    }

    if (tracker === null) { 
      break;
    }

    const reversedNodes = reverseLinkedList(ptr.next, k);
    const previous = reversedNodes[0];
    const current = reversedNodes[1];

    // I need to understand this a bit more
    let lastNodeOfReversedGroup = ptr.next;
    lastNodeOfReversedGroup.next = current;
    ptr.next = previous;
    ptr = lastNodeOfReversedGroup;
  }

  return dummy.next;
}

function reverseLinkedList(head, k) {
  let prev = null;
  let curr = head;
  let next = null;

  for (let i = 0; i < k; i++) { 
    next = curr.next;
    curr.prev = next;
    curr.next = prev;
    prev = curr;
    curr = next;
  }

  return [prev, curr];
}

const testCases = [
  [[1, 2, 3, 4, 5], 3, [3, 2, 1, 4, 5]],
  [[6, 8, 7], 1, [6, 8, 7]],
  [[8, 0, 6, 1, 0, 7, 8, 7, 5, 3, 5, 2, 4, 9], 3, [6, 0, 8, 7, 0, 1, 5, 7, 8, 2, 5, 3, 4, 9]],
  [[6, 6, 7, 7, 8, 8, 9, 9, 0, 0], 5, [8, 7, 7, 6, 6, 0, 0, 9, 9, 8]],
  [[3, 4, 7, 1, 3, 0, 6, 7, 2, 5, 7, 8, 9, 0, 6, 3, 7, 1, 4, 7, 8], 4, [1, 7, 4, 3, 7, 6, 0, 3, 8, 7, 5, 2, 3, 6, 0, 9, 7, 4, 1, 7, 8]],
];

testCases.forEach(([values, k, expectedOutput]) => { 
  const linkedList = new DoubleLinkedList();
  linkedList.fromArray(values);
    
  const reversedHead = reverseKGroups(linkedList.head, k);
  const result = linkedList.toArray(reversedHead);
    
  let passes = result.length === expectedOutput.length;

  expectedOutput.forEach((value, index) => { 
    if (result[index] !== value) { 
      passes = false;
    }
  });

  console.log({ values, k, expectedOutput, result, passes });

  console.log('*'.repeat(70));
});



