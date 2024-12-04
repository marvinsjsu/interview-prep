/**
 * Minimum Window Substring
 * 
 * Given two strings, s and t, find the minimum window substring in s,
 * which has the following properties: 
 * 
 * - It is the shortest substring
 * of s that includes all of the characters present in t. 
 * 
 * - It must contain at least the same frequency of each
 * character as in t. 
 * 
 * - The order of the characters does
 * not matter here.
 * 
 * Questions:
 * - Does case-sensitivity matter? No
 * - If length of t is larger than s, what should we return? ""
 * - If t is empty, what should we return? ""
 * 
 * Test-cases:
 * - "ABAACBBA", "ABC", "ACB"
 * - "ACBBACA", "ABA", "BACA"
 * - "ABAACBAB", "ABCC", ""
 * 
 * Algos:
 * 
 * - brute-force:
 *      - use minLength set to Infinity
 *      - use minSubstring set to ""
 *      - use a hash map for t's character to frequency:
 *          - { "character": { t: frequency of character in t, s: frequency of character in s, done: false }}
 *      - use start index set at 0
 *      - use end index set at 0
 *      - loop through s, using start and end index for sliding window pattern:
 *          - if s[end] is in hash map:
 *              - increment character's s value (hashMap[s[end]][t] += 1)
 *          
 *          - check each entry of hashMap:
 *              - if all character t === s:
 *                  - slide window by incrementing start
 *                  - set all character s values to 0
 *                  - get length (end - start + 1)
 *                  - if (length < minLength):
 *                      - set minLength to length
 *                      - set minSubstring = s.substring(start, end + 1)
 *                  
 *          - move end index by one position
 *       - return minSubstring
 *              
 * 
 * Trade-offs:
 * - brute-force with Sliding Window and Hash Map:
 *      - time-complexity:
 *          = O(m) + (O(n) x O(m))
 *          = O(m) + O(nm)
 *          = O(2m) + O(n)
 *          = O(m) + O(n)
 *          = O(m + n), n = # of characters in s, m = # of characters in t
 *      - space-complexity:
 *          = O(1), # of characters in t can be lowercase and uppercase alphabets (52 characters)
 *          = hash map storage is going to be constant for alpha-numeric keys
 * 
 * - the approach above is actually the optimal approach
 * 
 */

function findMinWinSubBrute (s, t) {
  if (t.length > s.length) {
    return '';
  }

  if (t.length === 0) {
    return '';
  }

  const charFreq = new Map();

  let i = 0;

  while (i < t.length) {
    const currChar = t[i];

    if (charFreq.has(currChar)) {
      const { tCount, sCount } = charFreq.get(currChar);
      charFreq.set(currChar, {
        tCount: tCount + 1,
        sCount,
      });
    } else {
      charFreq.set(currChar, {
        tCount: 1,
        sCount: 0,
      });
    }

    i++;
  }

  let minLength = Infinity;
  let minSubStr = '';

  let start = 0;
  let end = 0;

  while (end < s.length) {
    if (charFreq.has(s[end])) {
      const { tCount, sCount } = charFreq.get(s[end]); 
      charFreq.set(s[end], {
        sCount: sCount + 1,
        tCount,
      });
    } else {
      charFreq.set(s[end], {
        tCount: 0,
        sCount: 1,
      });
    }

    const allCharsSeen = [...charFreq.values()].every(({ tCount, sCount }) => tCount <= sCount);

    // console.log({ s, t, start, end, charFreq, allCharsSeen, minLength, minSubStr });


    if (allCharsSeen) {
      const length = end - start + 1;

      if (length < minLength) {
        minLength = length;
        minSubStr = s.substring(start, end + 1);
        console.log({ minLength, minSubStr });
      }

      const { tCount, sCount } = charFreq.get(s[start]);
      charFreq.set(s[start], {
        sCount: sCount - 1,
        tCount,
      });

      start++;

      const occurrences = charFreq.get(s[end]);
      charFreq.set(s[end], {
        sCount: occurrences.sCount - 1,
        tCount: occurrences.tCount,
      });

      end--;
    }

    end++;
  }

  return minSubStr;
}

const testCases = [
  ['ABAACBBA', 'ABC', 'ACB'], 
  ['ACBBACA', 'ABA', 'BACA'],
  ['ABAACBAB', 'ABCC', ''],
  ['ABDFGDCKAB' , 'ABCD', 'DCKAB'],
];


testCases.forEach(([s, t, expectedOutput]) => {
  const result = findMinWinSubBrute(s, t);
  const passed = result === expectedOutput;

  console.log({ s, t, expectedOutput, result, passed });
});

