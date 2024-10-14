/**
 * Sliding Window Maximum
 * 
 * Given an integer array, nums, find the maximum values in all the contiguous
 * subarrays (windows) of size w.
 * 
 * 
 * Questions:
 * - What should we return if size w is larger than the number of elements in the array? return []
 * - What should we return for an empty array? return []
 * - Is it safe to assume that the input array will always be of integer values? yes
 * 
 * Test cases:
 * - [-4, 2, -5, 3, 6], 3, [2, 3, 6]
 * - [1, 2, 3, 4, 5, 6], 6, [6]
 * - [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 4, [4, 5, 6, 7, 8, 9, 10]
 * 
 * Algos:
 * - brute-force approach:
 *      - use output array to store max values
 *      - iterate each element until index is less than or equal to nums.length - w (external loop):
 *          - from index, we look at each subsequent element within w - 1 positions (internal loop):
 *              - store a max value
 *              - compare each element to max value:
 *                  - if current element is greater than max value, set max value to element value
 *          - store max value in output array
 *      - return output array
 * 
 * - Sliding Window approach:
 *      - use dequeue data structure to keep index of elements sorted in decreasing order (this is our currentWindow)
 *      - we initially insert each index in our dequeue up to w and at each step, we
 *        cleanup:
 *          - cleanup checks if the current window's last element has a value that is smaller or equal to the
 *            latest value of the index we're adding to our current window:
 *                  - if so, remove that element (we do this via `.pop()`)
 *          - we continue to do this until the condition is no longer met (current window has an index and its
 *            last stored index is pointing to a value less or equal to the current value)
 *          - this ensures that our currentWindow queue is storing indexes pointing to values that is
 *            decreasing in order
 *      - then we loop through the rest of the elements in our input array:
 *          - applying the cleanup
 *          - checking if the first element of current window is within the sliding window (i - w):
 *                  - if not, we need to remove the first element via `.shift()`
 *          - add the latest index of the most recent element, i
 *          - in output, push the value of the first index stored by current window
 *      - return output
 * 
 * Trade-offs:
 * - brute-force approach:
 *      - time-complexity: O(n - w) * O(w) = O(nw), n = # of elements in nums and w is size of window
 *      - space-complexity: O(w)
 * 
 * - Sliding Window with Dequeue:
 *      - time-complexity: O(n), n = # of elements in nums
 *      - space-complexity: O(w), w = size of the window
 * 
 */

const Dequeue = require('../libs/dequeue');
const MinHeap = require('../libs/min-heap');

function getMaxSlidingWindowBrute (nums, w) {
    const output = [];

    if (w > nums.length) {
        return output;
    }

    if (w === nums.length) {
        nums.sort((a, b) => a - b);

        return [nums[nums.length - 1]];
    }

    for (let i = 0; i <= nums.length - w; i++) { // O(n - w)
        let maxValue = Number.NEGATIVE_INFINITY;

        for (let j = i; j < i + w; j++) { // O(w)
            if (nums[j] > maxValue) {
                maxValue = nums[j];
            }
        }

        output.push(maxValue);
    }

    return output;
}

function getMaxSlidingWindowOptimal (nums, w) {
    
    if (nums.length === 1) {
        return nums;
    }

    const output = [];
    const currWindow = new Dequeue();

    let i = 0;
    while ( i < w) {
        cleanup(i, currWindow, nums);
        currWindow.push(i);
        i++;
    }

    output.push(nums[currWindow.peekFront()]);

    for (let i = w; i < nums.length; i++) {
        cleanup(i, currWindow, nums);

        if (currWindow.length > 0
            && currWindow.peekFront() <= i - w
        ) {
            currWindow.shift();
        }

        currWindow.push(i);

        output.push(nums[currWindow.peekFront()]);
    }

    return output;
}

function cleanup (index, currentWindow, nums) {
    while (currentWindow.length > 0
        &&  nums[index] >= nums[currentWindow.peekBack()]
    ) {
        currentWindow.pop();
    }
}


function getMaxSlidingWindowOptimal2 (nums, w) {
    const output = [];
    const minHeap = new MinHeap();

    for (let i = 0; i <= nums.length - w; i++) {
        const queue = [];
        let currIndex = i;
        let end = i + w;

        while (currIndex < end) {
            minHeap.offer(nums[currIndex]);
            currIndex++;
        }

        while (minHeap.size() > 0) {
            const val = minHeap.poll();
            queue.push(val);
        }

        output.push(queue[queue.length - 1]);
    }

    return output;
}


const testCases = [
    [[-4, 2, -5, 3, 6], 3, [2, 3, 6]],
    [[1, 2, 3, 4, 5, 6], 6, [6]],
    [[1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 4, [4, 5, 6, 7, 8, 9, 10]],
];

testCases.forEach(([nums, w, expectedOutput]) => {
    // const result = getMaxSlidingWindowBrute(nums, w);
    const result = getMaxSlidingWindowOptimal(nums, w);
    // const result = getMaxSlidingWindowOptimal2(nums, w);

    let passes = result.length === expectedOutput.length;

    expectedOutput.forEach((expectedValue) => {
        if (!result.includes(expectedValue)) {
            passes = false;
        }
    });

    console.log({ nums, w, expectedOutput, result, passes });
});

// testCases.forEach(([nums, w, expectedOutput]) => {
//     const minHeap = new MinHeap(nums);
//     console.log({ minHeap });
// });

