
const SingleLinkedList = require('./lib/single-linked-list');

function removeNthNodeFromEnd(head, n) { 
  if (!head || n === 0) { 
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
  [[1, 2, 3, 4, 5], 4, [1, 3, 4, 5]],
  [[2, 4, 6, 8, 10], 5, [4, 6, 8, 10]],
  [[2, 4, 6, 8, 10], 1, [2, 4, 6, 8]],
  [[2, 4, 6, 8, 10], 0, [2, 4, 6, 8, 10]],
];

testCases.forEach(([values, n, expectedOutput]) => { 
  const linkedList = new SingleLinkedList();
  linkedList.fromArray(values);

  console.log(linkedList.display());

  const resultHead = removeNthNodeFromEnd(linkedList.head, n);

  console.log(linkedList.display(resultHead));

  const result = linkedList.toArray(resultHead);

  let passes = result.length === expectedOutput.length;

  expectedOutput.forEach((value, index) => {
    if (result[index] !== value) { 
      passes = false;
    }
  });

  console.log({ values, n, expectedOutput, result, passes });
  console.log('*'.repeat(50));
});


