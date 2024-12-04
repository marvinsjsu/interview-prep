/**
 * Find K Closest Elements
 * 
 * You are given a sorted array of integers, nums, and two integers, 
 * target and k. Your task is to return k number of integers that 
 * are close to the target value, target. The integers in the 
 * output array should be in a sorted order.
 * 
 * An integer, nums[i], is considered to be closer to target, as 
 * compared to nums[j] when |nums[i] - target| < |nums[j] - target|. 
 * However, when |nums[i] - target| == |nums[j] - target|, 
 * the smaller of the two values is selected.
 */

const testCases = [
    [[1, 2, 3, 4, 5], 4, 3, [1, 2, 3, 4]],
    [[1, 2, 3, 4, 5], 3, 6, [3, 4, 5]],
    [[1, 2, 3, 4, 5], 2, -1, [1, 2]],
];


testCases.forEach(([nums, k, target, expectedOutput]) => { 
    // const result = findKClosestElementsBrute(nums, k, target);
    // const result = findKClosestElements(nums, k, target);
    const result = findKClosestElementsOptimal(nums, k, target);


    let passes = result.length === expectedOutput.length;

    expectedOutput.forEach((val, index) => { 
        if (result[index] !== val) { 
            passes = false;
        }
    });

    console.log({ nums, k, target, expectedOutput, result, passes });
});

function findKClosestElementsBrute(nums, k, target) { 
    const closestElements = [];
    
    if (target < nums[0]) { 
        let i = 0;
        while (i < k) { 
            closestElements.push(nums[i]);
            i++;
        }

        return closestElements;
    }

    if (target > nums[nums.length - 1]) { 
        let i = 0;
        while (i < k) { 
            closestElements.unshift(nums[nums.length - 1 - i]);
            i++;
        }

        return closestElements;
    }

    const getDistance = (a, b) => Math.abs(Math.abs(a) - Math.abs(b));

    let left = 0;
    let right = nums.length - 1;

    while (left <= right) { 
        const mid = left + Math.floor((right - left) / 2);
        const val = nums[mid];
        const distance = getDistance(nums[mid], target);

        console.log({ left, right, val, distance });

        if (val === target) {
            closestElements.push([distance, val]);

            let i = 1;
            let j = 1;
            while (closestElements.length < k) { 
                if (mid - i >= 0) { 
                    const val = nums[mid - i];
                    const distance = getDistance(val, target);
                    closestElements.push([distance, val]);
                    closestElements.sort((a, b) => a[0] - b[0]);
                    i++;
                }

                if (mid + j < nums.length) { 
                    const val = nums[mid + j];
                    const distance = getDistance(val, target);
                    closestElements.push([distance, val]);
                    closestElements.sort((a, b) => a[0] - b[0]);
                    j++;
                }

                if (closestElements.length > k) { 
                    closestElements.pop();
                }
            }
            break;
        } else if (val < target) {
            left = mid + 1;
        } else if (val > target) { 
            right = mid - 1;
        }
    }

    return closestElements.map(([_, val]) => val).sort((a, b) => a - b);
}

function findKClosestElementsBruteII(nums, k, target) { 
    /**
     * 
     *  if target <= first element in nums
     *      return first k elements in nums
     *  if target >= last element in nums
     *      return last k elements in num
     *  if target is between first and last elements
     *      - define a getDistance function
     *      - visit each element in nums and get distance
     *      - use a MinHeap with size k, sorted by distance
     *  return values
     */

    if (target <= nums[0] && k < nums.length) { 
        return nums.slice(0, k);
    }

    if (target >= nums[nums.length - 1] && k < nums.length) { 
        return nums.slice(nums.length - 1 - k, nums.length);
    }

    const distanceWithVals = nums.map((val) => [getDistance(val, target), val]);

    distanceWithVals.sort((a, b) => { 
        return a[0] === b[0]
            ? a[1] - b[1]
            : a[0] - b[0];
    });

    return distanceWithVals.slice(0, k).map(([distance, value]) => value).sort((a, b) => a - b); 
}

function getDistance(val, target) { 
    return Math.abs(val - target);
}

function findKClosestElementsOptimal(nums, k, target) { 
    /**
     * - use Modified Binary Search and Sliding Windows
     *      - define helper function, findClosestElementIndex(nums, target)
     *          - use binary search
     *      - use sliding window of size k
     *          - expand one position left
     *          - expand one position right
     *          - until window size k    
     *      - return window
     */

    if (nums.length === k) { 
        return nums;
    }

    if (target <= nums[0]) { 
        return nums.slice(0, k);
    }

    if (target >= nums[nums.length - 1]) { 
        return nums.slice(nums.length - k);
    }

    const closestElementIndex = findClosestElementIndex(nums, target);

    let left = closestElementIndex - 1;
    let right = left + 1;

    while (right - left - 1 < k) { 
        if (left === -1) { 
            right++;
            continue;
        }

        if (right === nums.length
            || getDistance(nums[left], target) <= getDistance(nums[right], target)
        ) {
            left--;
        } else { 
            right++;
        }
    }

    return nums.slice(left + 1, right);
}





function findClosestElementIndex(nums, target) { 

    let left = 0;
    let right = nums.length - 1;

    while (left <= right) { 
        const mid = left + Math.floor((right - left) / 2);

        if (nums[mid] === target) {
            return mid;
        } else if (nums[mid] < target) {
            left = mid + 1;
        } else if (nums[mid] > target) { 
            right = mid - 1;
        }
    }

    return left;
}

