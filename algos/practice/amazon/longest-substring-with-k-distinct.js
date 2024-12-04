/**
 * Longest Substring with At Most K Distinct Characters
 * 
 * Given a string, find the length of the longest substring in it
 * with no more than K distinct characters.
 * 
 * Questions:
 * - What should we return when the input string is empty? 0
 * - Will the k value ever be zero or less? yes to 0, no to negatives
 * - If k larger than the total number of characters in the input
 *   string, would we just return the length of the input string? yes
 * 
 * Test cases:
 * - "abcdeffg", 3, 4
 * 
 * Algos:
 * - use Sliding Window approach:
 *      - use a "maxLength" to store largest length value
 *      - use two pointers for our window:
 *          - end pointer will be set to first character of input string
 *          - start pointer will be set to first character of input string
 *          - use a hash or a map to keep character frequencies
 *          - use a loop where we incrementally move our end pointer to
 *            create the window representing our substring:
 *              - store the current character into our hash or map
 *              - when the number of unique characters is larger than k:
 *                  - move our start pointer forward one position
 *                  - update our hash or map
 *                  - update our "maxLength" value if current window size
 *                    is larger than current "maxLength" value
 *      - return "maxLength" value
 *          
 * 
 * Trade-offs:
 * 
 * 
 */

function findMaxLengthKDistinct(str, k) { 
  if (str.length === 0 || k === 0) { 
    return 0;
  }

  if (k > str.length) { 
    return str.length;
  }

  const charFrequency = new Map();

  let maxLength = 0;
  let start = 0;

  for (let end = 0; end < str.length; end++) {
    const endChar = str[end];
    charFrequency.set(endChar, (charFrequency.get(endChar) || 0) + 1);

    while (charFrequency.size > k) { 
      const startChar = str[start];
      charFrequency.set(startChar, charFrequency.get(startChar) - 1);

      if (charFrequency.get(startChar) === 0) { 
        charFrequency.delete(startChar);
      }

      start++;
    }
        
    const currWindowSize = end - start + 1;

    maxLength = Math.max(maxLength, currWindowSize);
  }

  return maxLength;
}

const testCases = [
  ['abcdeffg', 3, 4],
];

testCases.forEach(([str, k, expectedOutput]) => { 
  const result = findMaxLengthKDistinct(str, k);
  const passes = result === expectedOutput;

  console.log({ str, k, expectedOutput, result, passes });
});