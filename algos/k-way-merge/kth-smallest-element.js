/**
 * The kth smallest element in multiple sorted arrays
 * 
 * Find the kth smallest element of multiple sorted arrays.
 */

const MinHeap = require('../libs/min-heap');

const testCases = [
  [[[1, 6, 8, 12], [3, 6, 7], [1, 3, 4, 5, 9], [1, 6, 7]], 4, 3],
];

testCases.forEach(([sortedArrays, k, expectedOutput]) => { 
  const result = findKthSmallestElementInMSortedArrays(sortedArrays, k);
  const passes = result === expectedOutput;

  console.log({ sortedArrays, k, expectedOutput, result, passes });
});


function findKthSmallestElementInMSortedArrays(sortedArrays, k) { 
  if (!sortedArrays || sortedArrays.length === 0 || k < 1) { 
    return null;
  }

  const minHeap = new MinHeap([], (a, b) => a[0] - b[0]);

  sortedArrays.forEach((arr, index) => { 
    if (arr[0]) { 
      minHeap.offer([arr[0], index, 0]);
    }
  });

  let smallestNumber;
  let i = 0;

  while (minHeap.size() > 0) { 
    const [value, sortedArraysIndex, index] = minHeap.poll();

    smallestNumber = value;

    i++;

    if (i === k) { 
      break;
    }

    if (index + 1 < sortedArrays[sortedArraysIndex].length) { 
      minHeap.offer([
        sortedArrays[sortedArraysIndex][index + 1],
        sortedArraysIndex,
        index + 1
      ]);
    }
  }

  return smallestNumber
    ? smallestNumber
    : 0;
}


