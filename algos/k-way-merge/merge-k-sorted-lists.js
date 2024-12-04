/**
 * Merge K sorted linked lists
 * 
 * Given an array of k sorted linked lists, your task is to merge 
 * them into a single sorted linked list and return the head of 
 * this linked list.
 * 
 */

const LinkedLists = require('../libs/linked-list');
const Node = require('../libs/node');

const testCases = [
  [[[2, 4, 6, 8], [1, 3, 5, 7]], [1, 2, 3, 4, 5, 6, 7, 8]],
];

testCases.forEach(([linkedListArrs, expectedArr]) => { 
  const ll = linkedListArrs.map(arr => { 
    const linkedList = new LinkedLists();
    linkedList.from(arr);
    return linkedList;
  });

  const resultLL = mergeLinkedList(ll);
  // // const result = resultLL.toArray();
    
  // let passes = result.length === expectedArr.length;

  // expectedArr.forEach((val, index) => {
  //     if (result[index] !== val) {
  //         passes = false;
  //     }
  // });

  // console.log({ linkedListArrs, expectedArr, result, passes});
  console.log({ linkedListArrs, expectedArr, resultLL});
    
});

function mergeLinkedList(lists) { 
  const dummy = new LinkedLists(0);
    
  let prev = dummy;
  let head1 = lists[0].head;

  while (lists.length > 1) { 
    const currList = lists.pop();
    let head2 = currList.head;

    while (head2 && head2.next) { 
      if (head1.data < head2.data) {
        prev.next = new Node(head1.data);
        prev = prev.next;
        head1 = head1.next;
      } else { 
        prev.next = new Node(head2.data);
        prev = prev.next;
        head2 = head2.next;
      }
    }
  }

  return dummy.next;
}