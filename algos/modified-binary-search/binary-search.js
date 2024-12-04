/**
 * Binary Search
 * 
 * We are given an array of integers, nums, sorted in ascending order, 
 * and an integer value, target. If the target exists in the array, 
 * return its index. If the target does not exist, return -1.
 */

const testCases = [
    [[-5, 0, 2, 6, 12], 6, 3],
    [[100, 223, 467, 800, 999], 223, 1],
    [[-5, 10, 19, 35, 10], 2, -1],
];

testCases.forEach(([nums, target, expectedOutput]) => { 
    // const result = binarySearchRecursive(nums, target);
    const result = binarySearchIterative(nums, target);
    const passes = result === expectedOutput;

    console.log({ nums, target, expectedOutput, result, passes });
});

function binarySearchRecursive(nums, target, start = 0, end = null) { 
    if (start > end) { 
        return -1;
    }

    if (!end) { 
        end = nums.length - 1;
    }

    const midIndex = Math.floor(start + (end - start) / 2);

    if (nums[midIndex] === target) {
        return midIndex;
    } else if (nums[midIndex] < target) {
        return binarySearchRecursive(nums, target, midIndex + 1, end);
    } else { 
        return binarySearchRecursive(nums, target, start, midIndex - 1);
    }
}

function binarySearchIterative(nums, target) { 
    let left = 0;
    let right = nums.length - 1;

    while (left <= right) { 
        const mid = left + Math.floor((right - left) / 2);

        if (nums[mid] === target) {
            return mid;
        } else if (nums[mid] > target) {
            right = mid - 1;
        } else if (nums[mid] < target) { 
            left = mid + 1;
        }
    }

    return -1;
}
