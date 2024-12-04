const LinkedList = require('../libs/linked-list');


/**
 * Questions:
 * - What should we return if head is null? null
 * - What should we return if there's only one node in the linked list? one and only node
 * - What should we return if we have an even number of nodes? the second middle node
 * 
 * Test-cases:
 * [1], 1
 * [1, 2], 2
 * [1, 2, 3], 2
 * [1, 2, 3, 4], 3
 * 
 * Algos:
 * - brute-force: use Two Pointer Strategy
 *      - set ptr1 and ptr2 to head
 *      - set nodeCounter to 0
 *      - while ptr2 is not null, go to the next node and increment nodeCounter
 *      - calculate middle node by Math.floor(nodeCounter/2) + 1, set this as middle
 *      - set loopCounter to 0
 *      - while ptr1 < middle, go to the next node and increment loopCounter
 *      - return ptr1
 *
 * - use Fast and Slow Pointers
 *      - set slowPtr and fastPtr to head
 *      - while fastPtr.next is not null:
 *          - move slowPtr 1 node
 *          - move fastPtr 2 nodes
 *      - return slowPtr
 * 
 * Tradeoffs:
 * - Two Pointer Strategy:
 *    
 * - Fast and Slow Pointers Strategy:
 * 
 */

function findMiddleNodeWithArray (head) {
  const nodes = [];

  let ptr = head;
    
  while (ptr) {
    nodes.push(ptr);
    ptr = ptr.next;
  }

  const middleNodeIndex = Math.floor(nodes.length / 2);

  console.log({ nodes });

  return nodes[middleNodeIndex];
}

function findMiddleNodeBrute (head) {
  let ptr1 = head;
  let ptr2 = head;

  let nodeCount = 0;
  while (ptr2) {
    ptr2 = ptr2.next;
    nodeCount++;
  }

  let stepsToMiddleNode = Math.floor(nodeCount / 2) + 1;
  let stepsTaken = 1;
  while (stepsTaken < stepsToMiddleNode) {
    ptr1 = ptr1.next;
    stepsTaken++;
  }

  return ptr1;
}

function findMiddleNode (head) {
  let slowPtr = head;
  let fastPtr = head;

  while (fastPtr && fastPtr.next) {
    slowPtr = slowPtr.next;
    fastPtr = fastPtr?.next.next;
  }

  return slowPtr;
}

const ll1 = new LinkedList();
const ll2 = new LinkedList();
const ll3 = new LinkedList();
const ll4 = new LinkedList();

ll1.from([1]);
ll2.from([1, 2]);
ll3.from([1, 2, 3]);
ll4.from([1, 2, 3, 4, 5, 6, 7]);

const testCases = [
  [ll1, ll1.head],
  [ll2, ll2.head.next],
  [ll3, ll3.head.next],
  [ll4, ll4.head.next.next.next],
];

testCases.forEach(([linkedList, expectedOutput]) => {
  const result = findMiddleNodeWithArray(linkedList.head);
  // const result = findMiddleNodeBrute(linkedList.head);
  // const result = findMiddleNode(linkedList.head);

  const isSameNode = result === expectedOutput;

  console.log(linkedList.display());
  console.log({ result, expectedOutput, isSameNode });
});