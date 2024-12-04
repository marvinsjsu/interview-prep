/**
 * Three Sum Problem
 * 
 * Given an array of integers, return an array of triplets (in any order)
 * such that i != j != k and nums[i] + nums[j] + nums[k] = 0. Note that
 * the solution set must not include duplicate triplets
 * (i.e., [1, 0, 0] and [0, 1, 0] are duplicative).
 * 
 * 
 * Algos:
 *  - brute-force with three nested for-loops O(n^3)
 *  - two-pointer pattern:
 *      - sort nums
 *      - use for-loop to get first value of the triplet:
 *          - set ptr1 to next element of first value, set ptr2 to last element of sorted nums
 *          - use a while-loop to move ptr1 and ptr2 towards each other:
 *              - get the sum of ptr1 and ptr2 values
 *              - get the difference of target value minus sum of ptr1 and ptr2 values
 *              - if difference is zero, we've found a triplet
 *  
 */

function findThreeSum(nums) { 
  if (!nums || nums.length < 3) { 
    return output;
  }

  const output = [];

  const sortedNums = nums.sort((a, b) => a - b); // [-1, 0, 1, 2, -1, -4] ==> [-4, -1, -1, 0, 1, 2]
    
  // sortedNums = [-4, -1, -1, 0, 1, 2]
  for (let i = 0; i < sortedNums.length - 2; i++) { 
    const currentValue = sortedNums[i]; // -4

    if (i > 0 && currentValue === sortedNums[i - 1]) { 
      continue;
    }

    let ptr1 = i + 1; // 1
    let ptr2 = sortedNums.length - 1; // 5

    while (ptr1 < ptr2) { 
      const sum = sortedNums[ptr1] + sortedNums[ptr2] + currentValue;

      if (sum === 0) {
        output.push([currentValue, sortedNums[ptr1], sortedNums[ptr2]]);
        ptr1++;
        ptr2--;
      } else if (sum > 0) {
        ptr2--;
      } else { 
        ptr1++;
      }
            
    }
  }

  return output;
}

const testCases = [
  [[-1, 0, 1, 2, -1, -4], [[-1, -1, 2], [-1, 0, 1]]], 
  [[1, 2, 7, 12], []],
  [[7,4,-7,0], [[0,-7,7]]],
];

testCases.forEach(([nums, expectedOutput]) => { 
  const result = findThreeSum(nums);

  console.log({ nums, expectedOutput, result });
});