/**
 * Reverse Nodes in Even Length Groups
 * 
 * Given the head of a linked list, the nodes in it are assigned
 * to each group in a sequential manner. The length of these
 * groups follows the sequence of natural numbers. Natural
 * numbers are positive whole numbers denoted by (1, 2, 3, 4...).
 * 
 * In other words:
 * 
 * - The 1st node is assigned to the first group.
 * - The 2nd and 3rd nodes are assigned to the second group.
 * - The 4th, 5th, and 6th nodes are assigned to the third group, and so on.
 * 
 * Your task is to reverse the nodes in each group with an even number of
 * nodes and return the head of the modified linked list.
 * 
 * 
 * Questions:
 * 
 * 
 * Test cases:
 * - [1, 1, 0, 6], [1, 0, 1, 6]
 * - [3, 2, 0, 6, 5], [3, 0, 2, 5, 6]
 * - [5, 2, 6, 3, 9, 1, 7, 3, 8, 4], [5, 6, 2, 4, 9, 1, 4, 8, 3, 7]
 * 
 * Algos:
 * - brute-force approach:
 *      - create a dummy node, point dummy node's next to head
 *      - use a counter, "groupIndex", and set this to 0 (this counter serves as the group index 
 *        and also the length of the current group)
 *      - use a pointer, "prevNodeOfGroup", set to dummy
 *      - use a pointer, "startOfGroup", set to dummy
 *      - use a pointer, "endOfGroup", set to dummy
 *      - use a loop to iterate through the nodes of the linked list:
 *          - increment the "groupIndex"
 *          - use another loop to move "endOfGroup" pointer forward by same value as "groupIndex"
 *          - store current next value of last node in group (lastNodeNext)
 *          - if "groupIndex" is even, then reverse
 *          - set "prevNodeOfGroup" pointer's next to reversed head
 *          - set new last node of group to have next point to lastNodeNext
 *          - set "startOfGroup" to the next of "endOfGroup"
 *          - set "endOfGroup" to "startOfGroup"
 *      - return dummy.next
 * 
 * 
 * Trade-offs:
 * 
 * 
 * 
 */

const SingleLinkedList = require('./lib/single-linked-list');
const Node = require('./lib/node');

function reverseNodesInEvenGroups(head) { 
  if (!head) { 
    return;
  }

  let prev = head;
  let groupLength = 2;

  while (prev && prev.next) { 
    let node = prev;
    let nodeCounter = 0;

    for (let i = 0; i < groupLength; i++) { 
            
      if (!node.next) { 
        break;
      }

      node = node.next;
      nodeCounter++;
    }

    if (nodeCounter % 2 === 0) {
      let reverse = node.next;
      let curr = prev.next;

      for (let j = 0; j < nodeCounter; j++) { 
        let currNext = curr.next;
        curr.next = reverse;
        reverse = curr;
        curr = currNext;
      }

      let prevNext = prev.next;
      prev.next = reverse;
      prev = prevNext;

    } else { 
      prev = node;
    }

    groupLength++;
  }

  return head;
}

function display(head) {
  let output = '';
  let curr = head;
  while (curr) { 
    output += `${curr.value} ==> `;
    curr = curr.next;
  }

  console.log(output);
  console.log('*'.repeat(50));
}

function reverseNodes(head, end) { 
  let prev = null;
  let curr = head;
  let next = null;

  while (curr && curr !== end) { 
    next = curr.next;
    curr.next = prev;
    prev = curr;
    curr = next;
  }

  return [prev, head];
}



const testCases = [
  // [[1, 1, 0, 6], [1, 0, 1, 6]],
  // [[3, 2, 0, 6, 5], [3, 0, 2, 5, 6]],
  [[5, 2, 6, 3, 9, 1, 7, 3, 8, 4], [5, 6, 2, 3, 9, 1, 4, 8, 3, 7]],
];

testCases.forEach(([nodes, expectedOutput]) => { 
  const linkedList = new SingleLinkedList();
  linkedList.fromArray(nodes);

  const resultHead = reverseNodesInEvenGroups(linkedList.head);
  const result = linkedList.toArray(resultHead);

  let passes = result.length === expectedOutput.length;

  expectedOutput.forEach((value, index) => { 
    if (result[index] !== value) { 
      passes = false;
    }
  });

  console.log({ nodes, expectedOutput, result, passes });
  console.log('*'.repeat(50));
});