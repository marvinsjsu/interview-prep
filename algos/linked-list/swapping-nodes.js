/**
 * Swapping Nodes in a Linked List
 * 
 * Given the linked list and an integer, k, return the head
 * of the linked list after swapping the values of the kth
 * node from the beginning and the kth from the end of the
 * linked list.
 * 
 * 
 * Questions:
 * - What should we return if k equals 0?
 * - Will k ever be larger than total number of nodes in our linked list?
 * - What should we return if head is null?
 * 
 * Test cases:
 * - [6, 8, 7], 1, [7, 8, 6]
 * - [9, 0, 8, 2], 2, [9, 8, 0, 2]
 * - [1, 2, 3, 4, 5], 3, [1, 2, 3, 4, 5]
 * - [7, 4, 6, 1, 5, 8], 5, [7, 5, 6, 1, 4, 8]
 * 
 * Algos:
 * - use Two-Pointer approach two times:
 *  - first time is to find the k positions from the start
 *      - use a loop so we can move the pointer (A) k - 1 times
 *  - second time is to find k positions from the end
 *      - set a pointer (B) to the same position as we found in
 *        our first loop
 *      - then set a pointer (C) to the head of the linked list
 *      - advance both pointers until pointer (B) is at the end
 *      - swap the values of pointer A and pointer C
 * 
 * Trade-offs:
 * - Time-complexity: O(n)
 * - Space-complexity: O(1)
 * 
 * 
 */

const SingleLinkedList = require('./lib/single-linked-list');
const Node = require('./lib/node');

function swapNthNodes(head, k) { 
  if (!head) { 
    return;
  }

  if (k === 0) { 
    return head;
  }

  const dummy = new Node(0);
  dummy.next = head;
  let pointerA = dummy;
    
  let i = 0;
  while (i < k) { 
    pointerA = pointerA.next;
    i++;
  }

  let pointerB = pointerA;
  let pointerC = dummy;

  while (pointerB) { 
    pointerB = pointerB.next;
    pointerC = pointerC.next;
  }

  let pointerAValue = pointerA.value;
  pointerA.value = pointerC.value;
  pointerC.value = pointerAValue;

  return head;
}


function swapNthNodesOptimal(head, k) { 
  if (!head) { 
    return;
  }

  if (k === 0) { 
    return head;
  }

  let counter = 0;
  let front = null;
  let end = null;
  let curr = head;

  while (curr) { 
        
    counter++;
        
    if (end && end.next) { 
      end = end.next;
    }
        
    if (counter === k) { 
      front = curr;
      end = head;
    }

    curr = curr.next;
  }

  let frontValue = front.value;
  front.value = end.value;
  end.value = frontValue;

  return head;
}


const testCases = [
  [[6, 8, 7], 1, [7, 8, 6]],
  [[9, 0, 8, 2], 2, [9, 8, 0, 2]],
  [[1, 2, 3, 4, 5], 3, [1, 2, 3, 4, 5]],
  [[7, 4, 6, 1, 5, 8], 5, [7, 5, 6, 1, 4, 8]],
];


testCases.forEach(([values, k, expectedOutput]) => { 
  const linkedList = new SingleLinkedList();
  linkedList.fromArray(values);

  // const resultHead = swapNthNodes(linkedList.head, k);
  const resultHead = swapNthNodesOptimal(linkedList.head, k);
  const resultArray = linkedList.toArray(resultHead);

  let passes = resultArray.length === expectedOutput.length;

  expectedOutput.forEach((value, index) => { 
    if (resultArray[index] !== value) { 
      passes = false;
    }
  });

  console.log({ values, k, expectedOutput, resultArray, passes });
});