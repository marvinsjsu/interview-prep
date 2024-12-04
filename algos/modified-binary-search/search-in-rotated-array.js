/**
 * Search in Rotated Sorted Array
 * 
 * Given a sorted integer array, nums, and an integer value, target, 
 * the array is rotated by some arbitrary number. Search and return 
 * the index of target in this array. If the target does not exist, 
 * return -1.
 */

const testCases = [
    [[6, 7, 1, 2, 3, 4, 5], 2, 3],
    [[176, 188, 199, 200, 1, 2, 3], 199, 2],
    [[1, 2, 3, 4, 5, 6, 7], 8, -1],
];

testCases.forEach(([nums, target, expectedOutput]) => { 
    const result = findIndexInRotatedSortedArray(nums, target);
    const passes = result === expectedOutput;

    console.log({ nums, target, expectedOutput, passes });
});

function findIndexInRotatedSortedArray(nums, target) { 
    let start = 0;
    let end = nums.length - 1;
    let mid = start + Math.floor((end - start) / 2);

    let i = mid;
    let j = mid;

    while (i - 1 >= 0 && nums[i] > nums[i - 1]) { 
        if (nums[i] === target) { 
            return i;
        }

        i--;
    }

    while (j + 1 < nums.length && nums[j] < nums[j + 1]) { 
        if (nums[j] === target) { 
            return j;
        }

        j++;
    }

    if (i === 0) {
        const left = binarySearch(nums.slice(0, j), target);
        const right = binarySearch(nums.slice(j + 1, nums.length), target);
        return left === -1
            ? right
            : left;
    } else { 
        const left = binarySearch(nums.slice(0, i), target);
        const right = binarySearch(nums.slice(i + 1, nums.length), target);
        return left === -1
            ? right
            : left;
    }   

}

function binarySearch(nums, target) { 
    let left = 0;
    let right = nums.length - 1;

    while (left <= right) { 
        const mid = left + Math.floor((left - right) / 2);

        if (nums[mid] === target) {
            return mid;
        } else if (nums[left] <= nums[mid]) {
            if (nums[left] <= target && target < nums[mid]) {
                right = mid - 1;
            } else {
                left = mid + 1;
            }
        } else if (nums[mid] <= nums[right]) { 
            if (nums[mid] < target && target < nums[right]) {
                left = mid + 1;
            } else { 
                right = mid - 1;
            }
        }
    }

    return -1;
}