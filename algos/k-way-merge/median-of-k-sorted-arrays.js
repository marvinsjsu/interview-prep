/**
 * Median of k sorted arrays:
 * 
 * Find the median of the k sorted arrays.
 */

const MinHeap = require('../libs/min-heap');

const testCases = [
  [[[1, 6, 8, 12], [3, 6, 7], [1, 3, 4, 5, 9], [1, 6, 7]], 6],
];

testCases.forEach(([sortedArrays, expectedOutput]) => { 
  const result = findMedianOfKSortedArrays(sortedArrays);
  const passes = result === expectedOutput;

  console.log({ sortedArrays, expectedOutput, result, passes });
});

function findMedianOfKSortedArrays(sortedArrays) { 
  const mergedList = [];
  const minHeap = new MinHeap([], (a, b) => a[0] - b[0]);

  sortedArrays.forEach((sortedArray, index) => { 
    minHeap.offer([sortedArray[0], index, 0]);
  });

  while (minHeap.size() > 0) { 
    const [value, sortedArraysIndex, arrayIndex] = minHeap.poll();
    mergedList.push(value);

    if (arrayIndex + 1 < sortedArrays[sortedArraysIndex].length) { 
      minHeap.offer([sortedArrays[sortedArraysIndex][arrayIndex + 1], sortedArraysIndex, arrayIndex + 1]);
    }
  }

  const midIndex = Math.floor(mergedList.length / 2);

  console.log({ mergedList, midIndex });

  return mergedList.length % 2 === 0
    ? (mergedList[midIndex] + mergedList[midIndex]) / 2
    : mergedList[midIndex];
}

