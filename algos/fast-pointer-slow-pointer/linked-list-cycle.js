const LinkedList = require('../libs/linked-list');

/**
 * Questions:
 * - how should we handle empty linked list? return false
 * 
 * Test-cases:
 * - 1 => 2 => 3 => 4 => 5 (5 node has next pointing to null), false (has no cycle)
 * - 1 => 2 => 3 => 4 => 5 (5 node has next pointing to 2 node), true (has a cycle)
 * - 1 => 2 => 3 => 4 => 5 (5 node has next pointing to 4 node), true (has a cycle)
 * 
 * Algos:
 * - brute-force is using a Set and we traverse all nodes of the linked list and
 *   check if we've seen a node before
 * 
 * - more efficient approach is to use Fast and Slow pointers and see if these pointers
 *   point at the same node at a certain point
 * 
 * Tradeoffs:
 * - brute-force:
 *    - space-complexity: O(n), n = # of nodes
 *    - time-complexity: O(n), n = # of nodes
 * 
 * - Fast and Slow Pointers:
 *    - space-complexity: O(1)
 *    - time-complexity: O(n), n = # of nodes
 * 
 */
function hasCycle (head) {
    let ptr1 = head;
    let ptr2 = head;

    while (ptr2 && ptr2.next) {
        ptr1 = ptr1.next;
        ptr2 = ptr2.next.next

        if (ptr1 === ptr2) {
            return true;
        }
    }

    return false;
}


const ll1 = new LinkedList();
const ll2 = new LinkedList();
const ll3 = new LinkedList();

ll1.from([1, 2, 3, 4, 5]);
ll2.from([1, 2, 3, 4, 5]);
ll3.from([1, 2, 3, 4, 5]);

ll2.addCycle(5, 2);
ll3.addCycle(5, 4);

const testCases = [
    [ll1, false],
    [ll2, true],
    [ll3, true]
];

testCases.forEach(([linkedList, expectedOutput]) => {
    const result = hasCycle(linkedList.head);
    const isEqual = result === expectedOutput;

    linkedList.display();
    console.log({ expectedOutput, result, isEqual });
});