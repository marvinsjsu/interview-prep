

function hasThreeSumToTarget(nums, target) {
  if (!nums || nums.length === 0) { 
    return false;
  }

  // If we only have positive integers in nums
  if (target < 0) { 
    return false;
  }

  // If nums is not yet sorted, and we don't care about indices
  nums.sort((a, b) => a - b);
    
  let result = false;

  for (let i = 0; i < nums.length - 2; i++) { 
    const currTarget = target - nums[i];

    let ptr1 = i + 1;
    let ptr2 = nums.length - 1;

    while (ptr1 < ptr2) { 
      const sum = nums[ptr1] + nums[ptr2];

      if (sum === currTarget) {
        return true;
      } else if (sum < currTarget) {
        ptr1++;
      } else { 
        ptr2--;
      }
    }
  }


  return result;
}

/**
 * Given an array of integers, nums, and an integer value, target,
 * determine if there are any three integers in nums whose sum is
 * equal to the target, that is,
 * nums[i] + nums[j] + nums[k] == target.
 * 
 * Return TRUE if three such integers exist in the array. Otherwise, return FALSE.
 * 
 * 
 * Questions:
 * - If our nums array is empty, what should we return? false
 * - Will our nums array always have one combination of elements that sum to the target? no
 * - Is nums sorted? yes
 * - What should we return if we can't find a combination of elements that sum to the target? false
 * - Will nums have negative integers? no
 * - What are we returning? boolean, true if there's a combination, false if not
 * 
 * 
 * Test cases:
 * 
 * Algos:
 * 
 * Trade-offs:
 * 
 */