/**
 * Questions:
 * - is it sorted in increasing or decreasing order?
 * - what should our output be for an empty array? [null, null, null]
 * - what should be our output when we find 3 values that sum to the target? [index1, index2, index3]
 * - what should be our output if we don't find 3 values that sum to the target? [null, null, null]
 * - what if our array only has 2 elements, what should we return? [null, null, null]
 * - can we have duplicate values in our array? yes
 * - what if we have more than one combination of 3 values that sum to the target? return the first found
 * - should we check if target is integer? yes
 * 
 * Algos:
 * - use two-pointer strategy:
 *    - use for loop, increment until last element of input array:
    *    - ptr1 starts i
    *    - ptr2 starts i + 1
    *    - ptr3 starts at index of last element of input array
    *    - use while loop, while ptr2 < ptr3:
    *      - sum = nums[ptr1] + nums[ptr2] + nums[ptr3]
    *      - if sum === target, return [ptr1, ptr2, ptr3]
    *      - if sum < target, move ptr2 forward one position
    *      - if sum > target, move ptr3 backward one position
 * 
 * Tradeoffs:
 *  - space-complexity: O(1)
 *  - time-complexity: O(n^2) 
 * 
 * Test cases:
 * 
 */

[0, 1, 2, 3, 4], target = 9;

function findIndicesOfThreeSum (nums, target) {
  if (nums.length < 3) {
    return [null, null, null];
  }

  for (let i = 0; i < nums.length - 2; i++) {
    let ptr1 = i;
    let ptr2 = i + 1;
    let ptr3 = nums.length - 1;
    
    while (ptr2 < ptr3) {
      const sum = nums[ptr1] + nums[ptr2] + nums[ptr3];
            
      if (sum === target) {
        return [ptr1, ptr2, ptr3];
      } else if (sum < target) {
        ptr2++;
      } else {
        ptr3--;
      }
    }
  }

  return [null, null, null];
}


const testValues = [
  [[[1, 1, 2, 18], 20], [0, 1, 18]],
  [[[12, 15, 30, 90, 120], 165], [1, 2, 4]],
  [[[], 20], [null, null, null]],
  [[[1, 2], 20], [null, null, null]],
  [[[1, 2, 2, 4], 20], [null, null, null]],
  [[[1, 2, 3], 'a'], [null, null, null]],
];


testValues.forEach(([input, expectedOutput]) => {
  const [nums, target] = input;
  const result = findIndicesOfThreeSum(nums, target);

  let matches = true;
  result.forEach((val, index) => {
    if (val !== expectedOutput[index]) {
      matches = false;
    }
  });

  console.log({ nums, target, result, expectedOutput, matches });
});

