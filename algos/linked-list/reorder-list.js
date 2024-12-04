/**
 * Reorder List
 * 
 * Given the head of a singly linked list, reorder the list as if
 * it were folded on itself. For example, if the list is
 * represented as follows:
 * 
 * 
 * 
 * Questions:
 * 
 * 
 * Test cases:
 * - [6, 8, 7], [6, 7, 8]
 * - [9, 0, 8, 2], [9, 2, 0, 8]
 * - [1, 2, 3, 4, 5], [1, 5, 2, 4, 3]
 * - [7, 4, 6, 1, 5, 8], [7, 8, 4, 5, 6, 1]
 * - [0, 8, 3, 1, 9, 2, 7], [0, 7, 8, 2, 3, 9, 1]
 * - [4, 2, 7, 8, 9, 0, 2], [4, 2, 2, 0, 7, 9, 8]
 * - [0, 6, 7], [0, 7, 6]
 * - [9, 5, 8, 2, 1], [9, 1, 5, 2, 8]
 * - [6, 6, 7, 7, 8, 8, 9, 9, 0, 0], [6, 0, 6, 0, 7, 9, 7, 9, 8, 8]
 * 
 * Algos:
 * 
 * 
 * Trade-offs:
 * - In-Place manipulation of Linked List
 *      - Time-complexity: O(n)
 *      - Space-complexity: O(1)
 * 
 * 
 */

const SingleLinkedList = require('./lib/single-linked-list');
const Node = require('./lib/node');

function reorderListNaive(head) {
  const dummy = new Node(0);
  dummy.next = head;

  // Find middle node
  let tail = dummy;
  let nodeCount = 0;

  while (tail && tail.next) { 
    tail = tail.next;
    nodeCount++;
  }

  if (nodeCount < 2) { 
    return head;
  }

  let middleNodeCount = Math.ceil(nodeCount / 2);

  if (nodeCount % 2 === 0) { 
    middleNodeCount += 1;
  }

  let middleNode = dummy;
  let prevMiddleNode = null;
  for (let i = 0; i < middleNodeCount; i++) { 
    prevMiddleNode = middleNode;
    middleNode = middleNode.next;
  }

  // Reverse second half of linked list
  const reversedHead = reverseHelper(middleNode);
  prevMiddleNode.next = null;

  // Merge first and second linked list
  let currFirstLL = dummy.next;
  let currSecondLL = reversedHead;

  while (currFirstLL && currSecondLL) {
    let firstNextNode = currFirstLL.next;
    let secondNextNode = currSecondLL.next;
        
    currFirstLL.next = currSecondLL;
    currSecondLL.next = firstNextNode;

    // When first linked list ends but we
    // still have a node in the second
    // linked list, we need to link
    // the second node to previous
    // node
    if (!firstNextNode && secondNextNode) { 
      currSecondLL.next = secondNextNode;
    }

    currFirstLL = firstNextNode;
    currSecondLL = secondNextNode;
  }

  return dummy.next;
}

function reorderListOptimal(head) {
    
  if (!head) { 
    return;
  }

  let slow = head;
  let fast = head;

  while (fast && fast.next) { 
    slow = slow.next;
    fast = fast.next.next;
  }

  const reversedHead = reverseHelper(slow.next);
  slow.next = null;

  let ptr1 = head;
  let ptr2 = reversedHead;

  while (ptr1 && ptr2) { 
    const nextNodePtr1 = ptr1.next;
    const nextNodePtr2 = ptr2.next;

    ptr1.next = ptr2;
    ptr2.next = nextNodePtr1;

    ptr1 = nextNodePtr1;
    ptr2 = nextNodePtr2;
  }

  return head;
}



function reverseHelper(head) { 
  let prev = null;
  let curr = head;
  let next = null;

  while (curr) { 
    next = curr.next;
    curr.prev = next;
    curr.next = prev;
    prev = curr;
    curr = next;
  }

  return prev;
} 

const testCases = [
  [[6, 8, 7], [6, 7, 8]],
  [[9, 0, 8, 2], [9, 2, 0, 8]],
  [[1, 2, 3, 4, 5], [1, 5, 2, 4, 3]],
  [[7, 4, 6, 1, 5, 8], [7, 8, 4, 5, 6, 1]],
  [[0, 8, 3, 1, 9, 2, 7], [0, 7, 8, 2, 3, 9, 1]],
  [[4, 2, 7, 8, 9, 0, 2], [4, 2, 2, 0, 7, 9, 8]],
  [[0, 6, 7], [0, 7, 6]],
  [[9, 5, 8, 2, 1], [9, 1, 5, 2, 8]],
  [[6, 6, 7, 7, 8, 8, 9, 9, 0, 0], [6, 0, 6, 0, 7, 9, 7, 9, 8, 8]],
];

testCases.forEach(([values, expectedOutput]) => {
  const linkedList = new SingleLinkedList();
  linkedList.fromArray(values);

  // const reorderedHead = reorderListNaive(linkedList.head);
  const reorderedHead = reorderListOptimal(linkedList.head);
  const result = linkedList.toArray();

  let passes = result.length === expectedOutput.length;

  expectedOutput.forEach((value, index) => {
    if (result[index] !== value) {
      passes = false;
    }
  });

  console.log({ values, expectedOutput, result, passes });
  console.log('+'.repeat(50));
});

