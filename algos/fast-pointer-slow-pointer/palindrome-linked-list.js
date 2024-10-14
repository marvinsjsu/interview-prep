/**
 * Palindrome Linked List
 * 
 * Given the head of a linked list, your task is to check whether the linked list
 * is a palindrome or not. Return TRUE if the linked list is a palindrome;
 * otherwise, return FALSE.
 * 
 * Questions:
 * - What should we return for an empty linked list?
 * - What should we return for a linked list with one node?
 * - What type of data will a node contain?
 * 
 * Test-cases:
 * - [2, 4, 6,  2], true
 * - [0, 3, 5, 5, 0], false
 * - [9, 7, 4, 4, 7, 9 ], true
 * - [7, 3, 3, 3, 7], true
 * 
 * Algos:
 * - brute-force:
 *    - create a new linked list that is the reverse of the original linked list
 *    - iterate through the linked list:
 *        - compare each node of both linked lists
 *            - if node.data does not match, return false
 *    - check if either curr for each node has a next  
 * - use Fast and Slow Pointer Strategy:
 *    - set slow pointer at head
 *    - set fast pointer at head
 *    - iterate each node in linked list, each iteration is based on fast pointer:
 *          - fast pointer takes two steps each time
 *          - slow pointer takes one step each time
 *    - slow pointer will point to the middle node
 *    - fast pointer will point to last node
 *    - reverse linked list from slow pointer node's next
 *    - compare nodes of reversed linked list to first half of original linked list
 * 
 * Tradeoffs:
 *    - brute-force:
 *          - time-complexity: O(3n) => O(n), n = number of nodes in linked list
 *          - space-complexity: O(2n) => O(n), extra storage for reversed copy of linked list
 *    - Fast and Slow Pointer Strategy:
 *          - time-complexity: O(n), n = number of nodes in linked list
 *          - space-complexity: O(1), in-space reversal of linked list
 * 
 */

const LinkedList = require('../libs/linked-list');

function reverseLinkedList (head) {
    let prev = null;
    let follow = null;
    let curr = head;

    while (curr) {
        follow = curr.next;
        curr.next = prev;
        prev = curr;
        curr = follow;
    }

    return prev;
}

function isPalindromeLinkedListBrute (head) {
    const nodes = [];

    let curr = head;

    while (curr) {
        nodes.push(curr.data);
        curr = curr.next;
    }

    const linkedListCopy = new LinkedList();
    linkedListCopy.from(nodes);
    
    const reversedLinkedListCopyHead = reverseLinkedList(linkedListCopy.head);

    let currOriginalLinkedList = head;
    let currReversedCopyLinkedList = reversedLinkedListCopyHead;

    while (currOriginalLinkedList && currReversedCopyLinkedList) {
        if (currOriginalLinkedList.data !== currReversedCopyLinkedList.data) {
            return false;
        }
        currOriginalLinkedList = currOriginalLinkedList.next;
        currReversedCopyLinkedList = currReversedCopyLinkedList.next;
    }

    if (currReversedCopyLinkedList?.next || currOriginalLinkedList?.next) {
        return false;
    }

    return true;
}


function isPalindromeLinkedListOptimal (head) {
    let slow = head;
    let fast = head;

    while (fast && fast.next) {
        slow = slow.next;
        fast = fast.next.next;
    }

    let midHead = slow;
    let reversedHead = reverseLinkedList(midHead);

    let curr = head;
    let currReversed = reversedHead;

    while (curr && currReversed) {
        if (curr.data !== currReversed.data) {
            return false;
        }

        curr = curr.next;
        currReversed = currReversed.next;
    }

    if (curr?.next || currReversed?.next) {
        return false;
    }

    return true;
}


const testCases = [
    [[1, 2, 3, 4, 5], false],
    [[2, 4, 6, 2], false],
    [[0, 3, 5, 5, 0], false],
    [[9, 7, 4, 4, 7, 9], true],
    [[7, 3, 3, 3, 7], true],
];

testCases.forEach(([nodes, expectedOutput]) => {
    const ll = new LinkedList();
    ll.from(nodes);

    // const result = isPalindromeLinkedListBrute(ll.head);
    const result = isPalindromeLinkedListOptimal(ll.head);

    const isMatch = expectedOutput === result;

    console.log({ nodes, expectedOutput, result, isMatch });
});