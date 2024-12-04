/**
 * Top K Frequent Elements
 * 
 * Given an integer array nums and an integer k,
 * return the k most frequent elements. You may
 * return the answer in any order.
 * 
 * Questions:
 * - [1,1,1,2,2,3], 2, [1, 2]
 * - [1], 1, [1]
 * 
 * Test cases:
 * 
 * 
 * Algos:
 * 
 * 
 * Trade-offs:
 * 
 * 
 */

const MinHeap = require('./lib/min-heap');

function findTopKFrequentElements(nums, k) { 
  if (nums.length === 0 || k === 0) { 
    return [];
  }

  const integerFrequency = new Map();
  const minHeap = new MinHeap([], (a, b) => a[1] - b[1]);

  nums.forEach((value) => { 
    integerFrequency.set(
      value,
      (integerFrequency.get(value) || 0) + 1
    );
  });

  for (let [key, occurrences] of integerFrequency.entries()) { 
    minHeap.insert([key, occurrences]);
        
    while (minHeap.data.length > k) { 
      minHeap.poll();
    }
  }

  return minHeap.data.map(([key, _]) => key);
}

const testCases = [
  [[1,1,1,2,2,3], 2, [1, 2]],
  [[1], 1, [1]],
];

testCases.forEach(([nums, k, expectedOutput]) => { 
  const result = findTopKFrequentElements(nums, k);

  let passes = result.length === expectedOutput.length;

  expectedOutput.forEach((value) => {
    if (!result.includes(value)) {
      passes = false;
    }
  });

  console.log({ nums, k, expectedOutput, result, passes });
  console.log('*'.repeat(50));
});
