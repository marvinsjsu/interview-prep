/**
 * Questions:
 * - So negative number means moving to the left and positive number is moving to the right?
 * - What should we return if the array is empty?
 * - What should we return if the array has one element?
 *  
 * 
 * Test-cases:
 * [3, -3, 2, -2], false
 * [1, 4, 3, 2, 1], true
 * [-2, -3, 1, -3, 2], false
 * [5, -1, 1, 1, -7, -9], false
 * [2, 5, -4, 3, -1, 4], false
 * 
 * Algos:
 * - use Fast and Slow Pointer Strategy:
 *   - time-complexity: O(n^2), n being number of elements in input array
 *   - space-complexity: O(1)
 * 
 * Tradeoffs:
 * 
 */

/**
 * TODO: code the naive approach which yields the same time-complexity,
 * but space-complexity is O(n) as we store nodes we see to detect a
 * cycle
 */

function findCycleInArray (nums) {
    
    for (let i = 0; i < nums.length; i++) {
        let slowPtr = i;
        let fastPtr = i;

        while (true) {
            let prevSlowPtr = slowPtr;
            slowPtr = movePointer(nums, slowPtr);

            if (hasNoCycle(nums, prevSlowPtr, slowPtr)) {
                break;
            }

            let prevFastPtr = fastPtr;
            fastPtr = movePointer(nums, fastPtr);

            if (hasNoCycle(nums, prevFastPtr, fastPtr)) {
                break;
            }

            prevFastPtr = fastPtr;
            fastPtr = movePointer(nums, fastPtr);

            if (hasNoCycle(nums, prevFastPtr, fastPtr)) {
                break;
            }

            if (slowPtr === fastPtr) {
                return true;
            }

        }
    }

    return false;
}

function hasChangedDirection (arr, prevIdx, currIdx) {
    if (arr[prevIdx] > 0 && arr[currIdx] < 0) {
        return true;
    }

    if (arr[prevIdx] < 0 && arr[currIdx] > 0) {
        return true;
    }

    return false;
}

function isSameIndex (prevIdx, currIdx) {
    return prevIdx === currIdx;
}

function hasNoCycle (arr, prevIdx, currIdx) {
    const changedDirection = hasChangedDirection(arr, prevIdx, currIdx);
    const circularButOneNode = isSameIndex(prevIdx, currIdx);

    return changedDirection || circularButOneNode;
}

function movePointer (arr, pointerIdx) {
    const steps = arr[pointerIdx];
    return (steps + pointerIdx + arr.length) % arr.length;
}

// * [3, -3, 2, -2], false
// * [1, 4, 3, 2, 1], true
// * [-2, -3, 1, -3, 2], true
// * [5, -1, 1, 1, -7, -9], false
// * [2, 5, -4, 3, -1, 4], false

const testCases = [
    [[3, -3, 2, -2], false],
    [[1, 4, 3, 2, 1], true],
    [[-2, -3, 1, -3, 2], true],
    [[5, -1, 1, 1, -7, -9], false],
    [[2, 5, -4, 3, -1, 4], false],
];

testCases.forEach(([input, expectedOutput]) => {
    const result = findCycleInArray(input);
    const isMatch = result === expectedOutput;

    console.log({ input, expectedOutput, result, isMatch });
});