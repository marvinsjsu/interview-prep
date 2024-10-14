/**
 * Minimum Size Subarray Sum
 * 
 * Given an array of positive integers, nums, and a positive integer,
 * target, find the minimum length of a contiguous subarray whose
 * sum is greater than or equal to the target. If no such
 * subarray is found, return 0.
 * 
 * 
 * Questions:
 * - Is this a sorted array? No
 * - What should we return if nums is empty? 0
 * - What should we return if target is 0 or negative? 0
 * 
 * Test-cases:
 * - [2, 3, 1, 2, 4, 3], 7, 2
 * - [1, 1, 1, 1, 1, 3], 11, 0
 * - [1, 2, 7, 3, 4, 5], 10, 2
 * - [1, 2, 7, 1, 8], 9, 2
 * - [1, 3, 4, 5, 2], 12, 3 
 * - [7, 2, 4, 6, 5, 8], 6, 1 
 * 
 * Algos:
 * - use Sliding Window approach:
 *      - set a min length to 0
 *      - set a sum to 0
 *      - set left pointer to 0 index
 *      - set right pointer to 0 index
 *      - we'll loop through each element of our nums array:
 *          - we'll add to sum the value our right pointer is at
 *          - if sum is greater than or equal to target:
 *              - if so:
 *                  - compute length of window: end - start + 1
 *                  - if length < min length, set min length to length
 *                  - set our sum to 0
 *                  - move left pointer one position forward
 *          - move our right pointer one position forward
 *      - return min length
 * 
 * Trade-offs:
 * 
 * 
 * 
 */

/**
 * [2, 3, 1, 2, 4, 3], 7
 * 
 * - minLength = 6
 * - left = 0
 * - right = 0
 * - sum = 0
 * 
 * while loop:
 * - right = 0
 * - sum = 2
 * - right = 1
 * ===================
 * - right = 1
 * - sum = 2 + 3
 *       = 5
 * - right = 2
 * ===================
 * - right = 2
 * - sum = 5 + 1
 *       = 6
 * - right = 3
 * ===================
 * - right = 3
 * - sum = 6 + 2
 *       = 8
 * - length = 3 - 0 + 1
 *          = 4
 * - minLength = 4
 * - sum = 8 - 2
 *       = 6
 * - left = 1
 * - right = 4 
 * ===================
 * - right = 4
 * - left = 1
 * - sum = 6 + 4
 *       = 10
 * - length = 4 - 1 + 1
 *          = 4
 * - minLength = 4
 * - sum = 10 - 3
 *       = 7
 * - left = 2
 * - right = 5
 * ====================
 * - right = 5
 * - left = 2
 * - sum = 7 + 3
 *       = 10
 * 
 */

function findMinLengthSumSubarray (nums, target) {
    if (nums.length === 0) {
        return 0;
    }

    if (target <= 0) {
        return 0;
    }

    let minLength = Infinity;
    let left = 0;
    let right = 0;
    let sum = 0;

    while (right < nums.length) {

        if (nums[right] >= target) {
            return 1;
        }

        sum += nums[right];

        if (sum >= target) {
            while (sum >= target) {
                const length = right - left + 1;
                minLength = Math.min(minLength, length);
                sum -= nums[left];
                left++;
            }
        }
                
        right++;
    }

    return minLength === Infinity
        ? 0
        : minLength;
}

const testCases = [
    [[2, 3, 1, 2, 4, 3], 7, 2],
    [[1, 1, 1, 1, 1, 3], 11, 0],
    [[1, 2, 7, 3, 4, 5], 10, 2],
    [[1, 2, 7, 1, 8], 9, 2],
    [[1, 3, 4, 5, 2], 12, 3 ],
    [[7, 2, 4, 6, 5, 8], 6, 1 ],
    [[1,2,3,4], 10, 4], 
];

testCases.forEach(([ nums, target, expectedOutput ]) => {
    const result = findMinLengthSumSubarray(nums, target);
    const passes = result === expectedOutput;

    console.log({ nums, target, expectedOutput, result, passes });
});