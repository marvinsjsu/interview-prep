/**
 * Three Sum Problem
 * 
 * Given an array of integers, return an array of triplets (in any order)
 * such that i != j != k and nums[i] + nums[j] + nums[k] = 0. Note that
 * the solution set must not include duplicate triplets
 * (i.e., [1, 0, 0] and [0, 1, 0] are duplicative).
 * 
 * 
 * Questions:
 * - What if our input array is empty, what should we return?
 * - We want triplet values that sum to 0:
 *      - Is there always at least one triplet in an input array that sums to 0? no
 *      - Does the order of the array of triplet values matter? no
 *      - Will input array have duplicate values?
 * - Is it ok if we mutate our input array? yes
 * 
 * Test cases:
 * - [-1, 0, 1, 2, -1, -4], [[-1, -1, 2]]
 * - [1, 2, 7, 12], []
 * - [7, 4, -7, 0], [[0, -7, 7]]
 * 
 * Algos:
 * - use Two-pointer solution:
 *      - use "output" variable, which is an empty array
 *      - we'll sort our input array with .sort
 *      - we'll visit each value in our input array, up to the last two values:
 *          - keep a zeroSum being 0 - current value
 *          - use two pointers:
 *              - pointerA is one position in front of the current value
 *              - pointerB is is pointing at the last value of the input array
 *              - we'll sum the values of pointerA and pointerB:
 *                  - compare it to zeroSum:
 *                      - if sum is larger than zeroSum, move pointerB back one position
 *                      - if sum is less than zeroSum, move pointerA forward one position
 *                      - if sum is equal to zeroSum, then insert [current value, value at pointerA, value at pointerB]
 *                        into "output"
 *      - return "output" array
 * 
 * Trade-offs:
 * 
 */

function find3Sum(nums) { 
  const output = [];

  if (nums.length === 0) { 
    return output;
  }

  const uniqueKeys = new Set();

  nums.sort((a, b) => a - b);

  for (let i = 0; i < nums.length - 2; i++) { 
    const zeroSum = 0 - nums[i];

    let ptrA = i + 1;
    let ptrB = nums.length - 1;

    while (ptrA < ptrB) { 
      const ptrsValueSum = nums[ptrA] + nums[ptrB];

      if (ptrsValueSum === zeroSum) {
        let key = `${nums[i]}-${nums[ptrA]}-${nums[ptrB]}}`;

        if (!uniqueKeys.has(key)) {
          output.push([nums[i], nums[ptrA], nums[ptrB]]);
          uniqueKeys.add(key);
        }

        ptrA++;
        ptrB--;
      } else if (ptrsValueSum < zeroSum) {
        ptrA++;
      } else { 
        ptrB--;
      }
    }

  }

  return [...output];
}

function find3SumOptimal(nums) { 
  const output = [];

  if (nums.length === 0) { 
    return output;
  }

  const sortedNums = nums.sort((a, b) => a - b);

  for (let i = 0; i < sortedNums.length; i++) { 
        
    if (i > 0 && sortedNums[i] === sortedNums[i - 1]) { 
      continue;
    }

    const target = -sortedNums[i];

    let left = i + 1;
    let right = sortedNums.length - 1;

    while (left < right) { 
      const sum = sortedNums[left] + sortedNums[right];

      if (sum === target) {
        output.push([sortedNums[i], sortedNums[left], sortedNums[right]]);
        left++;

        while (left < right && sortedNums[left] === sortedNums[left - 1]) {
          left++;
        }
      } else if (sum < target) {
        left++;
      } else { 
        right--;
      }
    }
  }

  return output;
}

const testCases = [
  [[-1, 0, 1, 2, -1, -4], [[-1, -1, 2], [-1, 0, 1]]],
  [[1, 2, 7, 12], []],
  [[7, 4, -7, 0], [[0, -7, 7]]],
];

testCases.forEach(([input, expectedOutput]) => { 
  const result = find3SumOptimal(input);
    
  let passes = result.length === expectedOutput.length;

  // expectedOutput.forEach((output, index) => { 
  //     console
  // });

  console.log({ input, expectedOutput, result, passes });
});


