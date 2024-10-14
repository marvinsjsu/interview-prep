const LinkedList = require('../libs/linked-list');

/**
 * Questions:
 * - Will n ever be larger than the number of nodes in the linked list?
 *   If so, do we start back up from the head? 
 * 
 * Algos:
 * - use two-pointer strategy:
 *    - point both pointers, p1 and p2 at the head
 *    - move p2 n times
 *    - check if p2 is at null, if so our n is the same as the number of nodes
 *      in our linked list, and we can return head.next since we're removing
 *      the very first node, which is the nth node
 *    - we then move both p1 and p2, until p2 is at the end of linked list
 *    - we then set p1's next to point to p1's next next
 *    - return head
 * 
 * Tradeoffs:
 *   - space-complexity: O(1)
 *   - time-complexity: O(n)
 * 
 * Test cases:
 * 
 * 
 */

function removeNthNode (head, n) {
    if (n === 0) {
        return head;
    }

    let ptr1 = head;
    let ptr2 = head;
    let i = 0;

    while (i < n) {
        ptr2 = ptr2.next;
        i++;
    }

    if (!ptr2) {
        return head.next;
    }

    while (ptr2.next) {
        ptr1 = ptr1.next;
        ptr2 = ptr2.next;
    }

    ptr1.next = ptr1.next.next;
    
    return head;
}


const testCases = [
    [[[1, 2, 3, 4, 5], 4], [1, 3, 4, 5]],
    [[[2, 4, 6, 8, 10], 5], [4, 6, 8, 10]],
    [[[2, 4, 6, 8, 10], 1], [2, 4, 6, 8]],
    [[[2, 4, 6, 8, 10], 0], [2, 4, 6, 8, 10]],
];


testCases.forEach(([input, expectedOutput]) => {
    const [ list, n ] = input;
    const linkedList = new LinkedList();
    linkedList.from(list);

    const newHead = removeNthNode(linkedList.head, n);
    linkedList.fromLinkedList(newHead);
    const resultArr = linkedList.toArray();

    let matches = true;
    expectedOutput.forEach((val, index) => {
        if (val !== resultArr[index]) {
            matches = false;
        }
    });

    console.log({ list, n, resultArr, expectedOutput, matches });
});
