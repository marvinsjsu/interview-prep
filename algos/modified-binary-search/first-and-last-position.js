/**
 * First and last position of an element in a sorted array: 
 * 
 * For a given integer array sorted in increasing order, 
 * find the starting and ending position of a given 
 * target value.
 * 
 */

const testCases = [
  [[3, 9, 9, 9, 11, 12], 9, [1, 3]],
];

testCases.forEach(([nums, target, expectedOutput]) => { 
  const result = findFirstAndLastPositions(nums, target);

  let passes = result.length === expectedOutput.length
    && result[0] === expectedOutput[0]
    && result[1] === expectedOutput[1];

  console.log({ nums, target, expectedOutput, result, passes });
});

function findFirstAndLastPositions(nums, target) { 
  const initialIndex = binarySearch(nums, target);

  let start = initialIndex;
  let end = initialIndex;

  while (start >= 0 && nums[start] === target) { 
    start--;
  }

  while (end < nums.length && nums[end] === target) { 
    end++;
  }

  return [start + 1, end - 1];
}

function binarySearch(nums, target, start = 0, end = null) {

  if (!end) { 
    end = nums.length - 1;
  }

  const midIndex = Math.floor(start + (end - start) / 2);

  if (nums[midIndex] === target) {
    return midIndex;
  } else if (nums[midIndex] > target) {
    return binarySearch(nums, target, start, midIndex - 1);
  } else { 
    return binarySearch(nums, target, midIndex + 1, end);
  }
}
