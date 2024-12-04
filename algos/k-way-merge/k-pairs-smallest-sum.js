/**
 * Find K Pairs with Smallest Sums
 * 
 * Given two arrays and an integer k, find k pairs of numbers with the smallest sum
 * so that in each pair, each array contributes one number to the pair.
 * 
 * Questions:
 *  - Are both input arrays sorted?
 * 
 * Test cases:
 * 
 * Algos:
 * 
 * Trade-offs:
 * 
 * 
 */

const MinHeap = require('../libs/min-heap');

const testCases = [
  [[2, 8, 9], [1, 3, 6], 3, [[2, 1], [2, 3], [2, 6]]],
  [[3, 4, 8, 9], [1, 2, 5, 6], 4, [[3, 1], [3, 2], [4, 1], [4, 2]]],
  [[1, 1, 2], [1, 2, 4], 2, [[1, 1], [1, 1]]],
  [[4, 7, 9], [4, 7, 9], 5, [[4, 4], [4, 7], [7, 4], [4, 9], [9, 4]]],
];

testCases.forEach(([nums1, nums2, k, expectedOutput]) => { 
  // const result = findKPairsSmallestSum(nums1, nums2, k);
  const result = findKPairsSmallestSumOptimal(nums1, nums2, k);
    
  let passes = result.length === expectedOutput.length;

  expectedOutput.forEach(([num1, num2], index) => { 
    const [resNum1, resNum2] = result[index];
    if (resNum1 !== num1 || resNum2 !== num2) { 
      passes = false;
    }
  });

  console.log({ nums1, nums2, k, expectedOutput, result, passes });
});

function findKPairsSmallestSum(nums1, nums2, k) { 
  const output = [];
  const sumHeap = new MinHeap([], (a, b) => a[0] - b[0]);

  for (let i = 0; i < nums1.length; i++) { 
    const currVal1 = nums1[i];

    for (let j = 0; j < nums2.length; j++) { 
      const currVal2 = nums2[j];
      const sum = currVal1 + currVal2;

      sumHeap.offer([sum, [currVal1, currVal2]]);
    }
  }

  let i = 0;

  while (i < k) { 
    output.push(sumHeap.poll()[1]);
    i++;
  }

  return output;
}

function findKPairsSmallestSumOptimal(nums1, nums2, k) { 
  const output = [];
  const sumHeap = new MinHeap([], (a, b) => a[0] - b[0]);

  const val1 = nums1[0];

  for (let i = 0; i < nums2.length; i++) { 
    const val2 = nums2[i];
    const sum = val1 + val2;
    sumHeap.offer([sum, [val1, val2]]);
  }

  let i = 1;
 

  while (i < nums1.length) { 
    const val1 = nums1[i];

    let j = 0;
    while (j < nums2.length) { 

      if (output.length === k) { 
        break;
      }

      if (sumHeap.size() > 0) { 
        output.push(sumHeap.poll()[1]);
      }

      const val2 = nums2[j];
      const sum = val1 + val2;

      sumHeap.offer([sum, [val1, val2]]);
            
      j++;
    }

    i++;
  }

  return output;
}


