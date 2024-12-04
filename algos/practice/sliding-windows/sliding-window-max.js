/**
 * Sliding Window Maximum
 * 
 * Given an integer array, nums, find the maximum values in
 * all the contiguous subarrays (windows) of size w.
 * 
 * Questions:
 * - What should our output be when nums is empty? 0
 * - What
 * 
 * Test cases:
 * - [-4, 2, -5, 3, 6], 3, [2, 3, 6]
 * - [1, 2, 3, 4, 5, 6], 6, [6]
 * - [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 4, [4, 5, 6, 7, 8, 9, 10]
 * 
 * Algos:
 * - use Sliding Window approach:
 *      - visit each integer in nums (use for-loop, ends early):
 *          - store max value to be integer at this index
 *          - while loop visiting subsequent integers 
 *      
 * 
 * Trade-offs:
 * 
 * 
 */