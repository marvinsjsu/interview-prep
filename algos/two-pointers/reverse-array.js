
/**
 * 
 * Questions:
 * - what should we return when we have an empty array?
 * - do we reverse this in-place?
 * Algos:
 * - use two-pointer strategy, where first pointer is pointing at
 * first element of the array, and second pointer is pointing at 
 * last element of the array.
 *    - swap step:  swap elements
 *    - move first pointer forward by one
 *    - move second pointer backward by one
 *    - repeat swap step, until first pointer is at same position
 *      as second pointer
 *    - return array
 *  
 * Tradeoffs:
 *    - space-complexity: O(1)
 *    - time-complexity: O(n)
 * Edge-cases: 
 */

function reverseArray(nums) {
    if (nums.length === 0) {
        return nums;
    }

    let ptr1 = 0;
    let ptr2 = nums.length - 1;

    while (ptr1 < ptr2) {
        const temp = nums[ptr1];
        nums[ptr1] = nums[ptr2];
        nums[ptr2] = temp;

        ptr1++;
        ptr2--;
    }

    return nums;
}

const testNumArrs = [
    [1, 2, 3, 4, 5, 6],
    [10, 20, 30, 40, 50, 60],
];

testNumArrs.forEach(nums => {
    console.log(`Before reversing: ${nums} -- After reversing: ${reverseArray(nums)}`);
});
