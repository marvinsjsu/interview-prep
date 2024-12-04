/**
 * Merge Sorted Array
 * 
 * Given two sorted integer arrays, nums1 and nums2, and the number of data elements
 * in each array, m and n, implement a function that merges the second array into
 * the first one.  You have to modify nums1 in place.
 * 
 */

const MinHeap = require('../libs/min-heap');

const testCases = [
  [[3, 4, 9, 0, 0, 0], 3, [1, 2, 7], 3, [1, 2, 3, 4, 7, 9]],
  [[1, 4, 9, 0, 0], 3, [1, 76], 2, [1, 1, 4, 9, 76]],
];

testCases.forEach(([arr1, m, arr2, n, expectedOutput]) => { 
  const result = mergeSorted(arr1, m, arr2, n);
    
  let passes = result.length === expectedOutput.length;

  expectedOutput.forEach((value, index) => {
    if (value !== result[index]) { 
      passes = false;
    }
  });

  console.log({ arr1, m, arr2, n, expectedOutput, result, passes });
});

function mergeSorted(nums1, m, nums2, n) { 

  let ptr1 = m - 1;
  let ptr2 = n - 1;
  let nums1Ptr = m + n - 1;

  while (ptr2 >= 0) {

    if (nums1[ptr1] > nums2[ptr2]) {
      nums1[nums1Ptr] = nums1[ptr1];
      ptr1--;
    } else { 
      nums1[nums1Ptr] = nums2[ptr2];
      ptr2--;
    }

    nums1Ptr--;
  }

  return nums1;
}

