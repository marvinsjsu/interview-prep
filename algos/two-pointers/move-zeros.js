/**
 * Questions:
 * - what should our output be with an empty array?
 * - can our array have a mix of data types?
 * - do we do this in-place?
 * 
 * Algos:
 * - use two-pointer strategy:
 *    - set ptr1 at start of array
 *    - set ptr2 at start of array
 *    - use while loop, ptr2 < # of elements in input array
 *       - if ptr2 element is not a zero:
 *              - swap elements with ptr1
 *              - move both ptr1 and ptr2 forward by one element
 *       - if ptr2 element is zero
 *              - move ptr2 forward by one element
 *    - return input array
 * 
 * Tradeoff:
 *    - space-complexity: O(1)
 *    - time-complexity: O(n)
 * 
 * Test cases:
 *    
 */

function moveZerosToEnd (nums) {
  if (nums.length === 0 || nums.length === 1) {
    return nums;
  }

  let ptr1 = 0;
  let ptr2 = 0;

  while (ptr2 < nums.length) {
    if (nums[ptr2] !== 0) {
      const temp = nums[ptr1];
      nums[ptr1] = nums[ptr2];
      nums[ptr2] = temp;
      ptr1++;
      ptr2++;
    } else {
      ptr2++;
    }
  }

  return nums;
}


const testValues = [
  [[0, 0, 0, 1, 2, 3], [1, 2, 3, 0, 0, 0]],
  [[], []],
  [[1], [1]],
  [[0, 0, 'a', 'b', 'c'], ['a', 'b', 'c', 0, 0]],
];

testValues.forEach(([input, expectedOutput]) => {
  const result = moveZerosToEnd(input);

  let matches = true;
  result.forEach((val, index) => {
    if (val !== expectedOutput[index]) {
      matches = false;
    }
  });

  console.log({ input, result, expectedOutput, matches });
});

