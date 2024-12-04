/**
 * Reverse the second half of a linked list
 * 
 * Given a singly linked list, reverse the second half of the list.
 * 
 * Questions:
 * 
 * 
 * Test cases:
 * - [1, 2, 3, 4, 5], [1, 2, 5, 4, 3]
 * 
 * Algos:
 * 
 * 
 * Trade-off:
 * 
 */

const SingleLinkedList = require('./lib/single-linked-list');

function reverseHalfLinkedList(head) { 
  let ptrA = head;
  let ptrB = head;
  let temp = null;

  while (ptrB && ptrB.next) { 
    temp = ptrA;
    ptrA = ptrA.next;
    ptrB = ptrB.next.next;
  }

  let curr = ptrA;
  let prev = null;

  while (curr) { 
    let next = curr.next;
    curr.prev = next;
    curr.next = prev;
    prev = curr;
    curr = next;
  }

  temp.next = prev;

  return head;
}

const testCases = [
  [[1, 2, 3, 4, 5], [1, 2, 5, 4, 3]], 
];

testCases.forEach(([values, expectedOutput]) => { 
  const linkedList = new SingleLinkedList();
    
  linkedList.fromArray(values);
  reverseHalfLinkedList(linkedList.head);
    
  const result = linkedList.toArray();
    
  let passes = result.length === expectedOutput.length;

  expectedOutput.forEach((value, index) => {
    if (result[index] !== value) {
      passes = false;
    }
  });

  console.log({ values, expectedOutput, result, passes });
});


