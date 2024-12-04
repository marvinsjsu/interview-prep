/**
 * Questions:
 * - Is the array sorted? no
 * - Will the array always have at least one duplicate value? yes
 * - Will the array ever have more than one duplicated value? no
 * 
 * Test-cases:
 * - [1, 2, 3, 4, 1], 1
 * - [1, 2, 3, 2, 4], 2
 * - [1, 2, 1], 1
 * - [1, 2, 3, 4, 5, 6, 7, 7], 7
 * 
 * Algos:
 * - use Two-Pointer Strategy
 *      - set left pointer at 0
 *      - set right pointer at left pointer + 1 position
 *      - do a while loop until right pointer is equal to or greater than nums.length:
 *          - compare values at left and right pointers:
 *              - if equal, return the value
 *              - else, increment right value by one position
 * 
 * - use Fast and Slow Pointer Strategy
 * 
 * Tradeoffs:
 *    - Two-Pointer Strategy:
 *      - time-complexity: O(n^2), n = number of elements in nums
 *      - space-complexity: O(1)
 * 
 *    - Fast and Slow Pointer Strategy:
 *      - time-complexity:
 *      - space-complexity:
 * 
 */

function findDuplicateBrute (nums) {
  for (let left = 0; left < nums.length - 1; left++) {
    let right = left + 1;

    while (right < nums.length) {
      if (nums[left] === nums[right]) {
        return nums[left];
      }

      right++;
    }
  }
}

function findDuplicate (nums) {
  let slow = nums[0];
  let fast = nums[0];

  while (true) {
    slow = nums[slow];
    fast = nums[nums[fast]];

    if (slow === fast) {
      break;
    }
  }

  slow = nums[0];

  while (slow !== fast) {
    slow = nums[slow];
    fast = nums[fast];
  }

  return fast;
}

function movePointer (arr, currPtr, steps = 1) {
  return (steps + currPtr + arr.length) % arr.length;
}

const testCases = [
  [[1, 2, 3, 4, 1], 1],
  [[1, 2, 3, 2, 4], 2],
  [[1, 2, 1], 1],
  [[1, 2, 3, 4, 5, 6, 7, 7], 7],
  [[1,3,6,2,7,3,5,4], 3],
];


testCases.forEach(([input, expectedOutput]) => {
  const result = findDuplicate(input);
  const isMatch = expectedOutput === result;

  console.log({ input, expectedOutput, result, isMatch });
});
