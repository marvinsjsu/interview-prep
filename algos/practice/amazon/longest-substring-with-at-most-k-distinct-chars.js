/**
 * Longest Substring with At Most K Distinct Characters Problem
 * 
 * Given a string, find the length of the longest substring in 
 * it with no more than K distinct characters.
 * 
 * 
 * Questions:
 * - What should we return if s is an empty string?
 * - What should we return if k is equal to or less than 0?
 * - If k is larger than the length of s, then our correct output is the length of s?
 * 
 * Test cases:
 * - "abcdeffg", 3, 4
 * 
 * Algos:
 * - use brute-force approach:
 *      - use variable, "maxLength", to store different lengths as we build windows
 *      - we'll visit each character in our string:
 *          - use ptr1 set to the index of the current character
 *          - use ptr2 set to ptr1 + 1 index
 *          - count the number of unique characters in our window
 *              - we can use a Set and the size property to know # of unique characters
 *          - if it's less than k, then move ptr2 one position forward
 *          - update our "maxLength" to the size of the current window
 *      - return "maxLength"    
 * 
 * - use Sliding Windows approach:
 * 
 * 
 * Trade-offs:
 * 
 * 
 * 
 */

function findLongestSubWithKDistinctChars(s, k) { 
  if (s.length === 0 || k === 0) { 
    return 0;
  }

  if (k > s.length) { 
    return s.length;
  }

  let maxLength = 0;

  for (let i = 0; i < s.length; i++) { 
    const uniqueChars = new Set();

    let ptr1 = i;
    let ptr2 = ptr1 + 1;

    uniqueChars.add(s[ptr1]);

    while (ptr2 < s.length && uniqueChars.size < k) { 
      uniqueChars.add(s[ptr2]);
      ptr2++;
    }

    maxLength = Math.max(maxLength, ptr2 - ptr1);
  }

  return maxLength;
}

function longestSubstringKDistinct(s, k) {
  let windowStart = 0;
  let maxLength = 0;
  let charFrequency = {};

  for (let windowEnd = 0; windowEnd < s.length; windowEnd++) {
    let rightChar = s[windowEnd];
    charFrequency[rightChar] = (charFrequency[rightChar] || 0) + 1;

    while (Object.keys(charFrequency).length > k) {
      let leftChar = s[windowStart];
      charFrequency[leftChar]--;
      if (charFrequency[leftChar] === 0) {
        delete charFrequency[leftChar];
      }
      windowStart++;
    }

    maxLength = Math.max(maxLength, windowEnd - windowStart + 1);
  }

  return maxLength;
}


const testCases = [
  ['abcdeffg', 3, 4],
  ['aaa', 2, 3],
  ['abcabbc', 2, 3],
];

testCases.forEach(([s, k, expectedOutput]) => { 
  // const result = findLongestSubWithKDistinctChars(s, k);
  const result = longestSubstringKDistinct(s, k);
  const passes = result === expectedOutput;

  console.log({ s, k, expectedOutput, result, passes });
  console.log('*'.repeat(50));
});

/** Review Practice
 * 
 * Algo:
 * - use Sliding Windows approach:
 *      - use maxLength variable to store maxLength of substring
 *      - use left pointer set to first element of our input array
 *      - use right pointer set to first element of our input array
 *      - use hashmap or Map to track character to frequency of occurrence
 *      - use for-loop to slide and expand our window:
 *          - get character from right pointer
 *          - insert this to our Map
 *          - get the substring from left pointer to right pointer + 1 (exclusive end)
 *          - check how many unique characters our substring has
 *          - if it's greater than k, then we need to slide our left pointer one position forward
 *          - get the current length via right pointer - left pointer + 1
 *          - check if current length is greater than maxLength:
 *              - if so, set current length as maxLength
 *      - return maxLength
 */

// str = "araaci", k = 2
// str = "aaa", k = 1
function findMaxLengthSubstringWithKDistinctChars(str, k) { 
  if (!str || str.length === 0) { 
    return 0;
  }

  const charFrequency = new Map(); // charFrequency = {}

  let maxLength = 0;
  let leftPtr = 0;

  for (let rightPtr = 0; rightPtr < str.length; rightPtr++) { 
    const rightChar = str[rightPtr];
    // rightPtr = 0, 1, 2, 3, 4, 5
    // rightChar = a, r, a, a, c, i
        
    charFrequency.set(rightChar, (charFrequency.get(rightChar) || 0) + 1);
    // charFrequency = { a: 3, c: 1, i: 1}

    while (charFrequency.size > k) { 
      const leftChar = str[leftPtr];
      // leftPtr = 0, 1, 2, 3
      // leftChar = a, r, a, a
        
      charFrequency.set(leftChar, charFrequency.get(leftChar) - 1);
      // charFrequency = { a: 0, c: 1, i: 1 }

      if (charFrequency.get(leftChar) === 0) { 
        charFrequency.delete(leftChar);
      }
      // charFrequency = { c: 1, i: 1}

      leftPtr++;
      // leftPtr = 1, 2, 3, 4
    }

    // maxLength = 4, rightPtr = 5, leftPtr = 4
    maxLength = Math.max(maxLength, rightPtr - leftPtr + 1);
    // maxLength = 4
  }

  return maxLength;
}
