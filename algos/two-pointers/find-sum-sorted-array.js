/**
 * Questions:
 * - what should our output be when we find a pair of elements in our
 * input array that equal the input integer? [index1, index2]
 * - what should our output be if we don't find a pair of elements
 * that equal our input integer? [null, null]
 * - what if we have multiple pairs that sum to the target? find one pair
 * - what should our output be if our input array is empty? [null, null]
 * - do we need to make sure elements in array are integers? yes
 * - do we need to make sure target argument is an integer? yes
 * - is the input array sorted? yes
 * 
 * Algo:
 * - use two-pointer strategy:
 *    - p1 at first element
 *    - p2 at last element
 *    - loop while p1 < p2
 *    - sum = nums[p1] + nums[p2]
 *    - if sum === target, return [p1, p2]
 *    - if sum < target, move p1 forward by one position
 *    - if sum > target, move p2 backward by one position
 *    - continue loop
 *    - outside of loop return [null, null]
 * 
 * Tradeoffs:
 *    - space-complexity: O(1)
 *    - time-complexity: O(n)
 * 
 * Test cases:
 *    - test for empty nums
 *    - test for single-entry nums
 *    - test for target not being an integer
 */

function findSumIndices(nums, target) {
  if (nums.length === 0 || nums.length === 1) {
    return [null, null];
  }

  if (!Number.isInteger(target)) {
    return [null, null];
  }

  let ptr1 = 0;
  let ptr2 = nums.length - 1;

  while (ptr1 < ptr2) {
    const sum = nums[ptr1] + nums[ptr2];

    if (sum === target) {
      return [ptr1, ptr2];
    } else if (sum < target) {
      ptr1++;
    } else {
      ptr2--;
    }
  }

  return [null, null];
}

const testValues = [
  [[2, 3, 4, 5, 6, 7, 8], 10],
  [[1, 5, 10, 15, 19], 20],
  [[], 10],
  [[1], 1],
  [[1, 2], 2],
  [[1, 2, 3, 17], 20],
  [[1, 2, 3, 4], 'a'],
];

testValues.forEach(([ nums, target ]) => {
  const indices = findSumIndices(nums, target);
  console.log({ nums, target }, { indices });
});

