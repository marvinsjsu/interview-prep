/**
 * Maximum sum subarray of size K
 * Given an array of integers and a positive integer k, find the maximum sum of any contiguous subarray of size k.
 * 
 * Questions:
 * - What should we return for an empty array?
 * - What should we return for an array that has less than k elements?
 * - Can we expect all values in the array to be an integer?
 * - When we say subarray, these are values that contiguous to each other?
 * 
 * Test-cases:
 * - [4, 2 -1, 9, 7, -3, 5], 4, 18
 * 
 * Algos:
 * - brute-force:
 *      - loop through each value in the array:
 *          - at each value, compute sum of current value and next 3 elements
 *          - compare computed value to a stored max value:
 *              - if greater than stored max value, replace with computed value
 *              - else, continue to next element
 *      - return stored max value
 *
 * - use Sliding Windows Strategy:
 *      - set start ptr at 0 index
 *      - set end ptr at 0 + k - 1
 *      - sum all values from start ptr to end ptr, store as max sum
 *      - move sliding window one position, continue until end is at last element of nums:
 *          - store temp value of max sum minus nums[start]
 *          - increment start by one position
 *          - increment end by one position
 *          - add nums[end] to temp value
 *          - compare temp value to stored max sum:
 *              - if temp value is greater than max sum, set max sum to temp value
 *      - return max sum
 * Tradeoffs:
 * - brute-force:
 *      - time-complexity: O(n * k), n = number of elements in the array, k = size of subarray
 *      - space-complexity: O(1), no additional storage used
 * 
 * - Sliding Window Strategy:
 *      - time-complexity: O(n) + O(k) => O(n), n = number of elements in the array, k = size of subarray
 *      - space-complexity: O(1), no additional storage
 * 
 */

function findMaxSumOfKBrute (nums, k) {
  let maxSum = Number.NEGATIVE_INFINITY;

  for (let i = 0; i < nums.length; i++) {
    let currSum = nums[i];
    let loopCount = 1;

    while (loopCount < k) {
      currSum += nums[i + loopCount];
      loopCount++;
    }
        
    if (currSum > maxSum) {
      maxSum = currSum;
    }
  }

  return maxSum;
}

function findMaxSumOfKOptimal (nums, k) {
  let start = 0;
  let end = start + k;
  let maxSum = 0;

  let i = 0;

  while (i < end) {
    maxSum += nums[i];
    i++;
  }

  let tempSum = maxSum;

  while (end < nums.length) {
    tempSum -= nums[start];
    tempSum += nums[end];
    start++;
    end++;

    if (tempSum > maxSum) {
      maxSum = tempSum;
    }
  }

  return maxSum;
}

function sumValuesWithinIndexes (nums, startIdx, endIdx) {
  let sum = 0;
    
  while (startIdx <= endIdx) {
    sum += nums[startIdx];
    startIdx++;
  }

  return sum;
}

const testCases = [
  [[4, 2, -1, 9, 7, -3, 5], 4, 18],
];

testCases.forEach(([nums, k, expectedOutput]) => {
  const result = findMaxSumOfKOptimal(nums, k);
  // const result = findMaxSumOfKBrute(nums, k);
  const isMatch = expectedOutput === result;

  console.log({ nums, k, expectedOutput, result, isMatch });
});

                                                                                                                     
