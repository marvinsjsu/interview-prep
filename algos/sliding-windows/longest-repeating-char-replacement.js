/**
 * Longest Repeating Character Replacement
 * 
 * Given a string s and an integer k, find the length of the longest
 * substring in s, where all characters are identical, after
 * replacing, at most, k characters with any other lowercase
 * English character.
 * 
 * 
 * Questions:
 * - What should we return if string s is empty? ""
 * - Do we have to replace k characters? No, it can be any number up to k
 * 
 * Test cases:
 * - "aabccbb", 2, 5
 * - "fzfzfz", 6, 6
 * - "xxxxx", 1, 5
 * - "lmno", 2, 3
 * 
 * Algos:
 * - brute-force approach with Sliding Windows:
 *      - set maxLength to 0
 *      - set left index to 0
 *      - set right index to left index + 1
 *      - set changeCount to k
 *      - loop through each character in our str:
 *          - if char at left index is equal to char at right index
 *              - increment right index by one position
 *          - else, if changeCount is greater than 0:
 *              - increment right index by one
 *              - decrement changeCount
 *          - else if changeCount is 0:
 *              - increment left index by one
 *              - set right index to left index + 1
 *              - set changeCount to k
 * 
 * - use Sliding Windows with Hash Map:
 *      - keep track of max length
 *      - keep track of count of most frequently occuring character in the window
 *      - keep a hash map that tracks the frequency of occurrence for each character
 *      - keep track of start (starts at index 0)
 *      - keep track of end (starts at index 0)
 *      - iterate through each character in str:
 *          - use hash map to check if character has been seen:
 *              - if so, increment occurrence of character in hash map
 *              - if not, set occurrence of character to 1 in hash map
 *          - check to see if count of frequently occuring character needs to be updated
 *            (this needs to be max frequency of character)
 *          - check to see if we have enough replacement characters available
 *            (end - start + 1 - max frequency of character) > k:
 *              - if so, continue
 *              - if not, we need to slide our window by incrementing start by one position
 *                and we also need to decrement the occurrence of the character at str[start]
 *          - get the length of the string via (end - start + 1)
 *          - if length is larger than max length, then set it as max length
 *          - increment end by one position
 *      - return max length
 *              
 *
 * Trade-offs:
 * - brute-force approach with Sliding Windows:
 *      - time-complexity: O(n^2)
 *      - space-complexity: O(1)
 * 
 * - Sliding Windows with Hash Map:
 *      - time-complexity: O(n)
 *      - space-complexity: O(1), because we are storing at max 26 unique characters (not affected by input string)
 */

/**
 * 
 * 
 * s: 'xxxxx', k: 1
 * 
 * - maxLen = 0
 * - i = 0
 * - replacementCount = 1
 * - left = 0
 * - right = 0
 * - tempMaxLen = 0
 * - currStartChat = 'x'
 * 
 * while loop right:
 * - tempMaxLen = 1
 * - right = 1
 * ----------------
 * - tempMaxLen = 2
 * - right = 2
 * ----------------
 * - tempMaxLen = 3
 * - right = 3
 * ----------------
 * - tempMaxLen = 4
 * - right = 4
 * ----------------
 * - tempMaxLen = 5
 * - right = 5
 * ----------------
 * 
 * - tempMaxLen = 5
 * - left = 0
 * - currLeft = 0
 * 
 * while loop left:
 * - tempMaxLen = 0
 * 
 */

function findLongestRepeatingCharReplacementBrute(str, k) {
  if (str.length <= k) {
    return str.length;
  }

  let maxLen = 0;

  for (let i = 0; i < str.length; i++) {
    let replacementCount = k;
    let left = i;
    let right = i;
    let tempMaxLen = 0;
    let currStartChar = str[left];

    while (right < str.length) {
      if (currStartChar === str[right]) {
        tempMaxLen++;
      } else {
        if (replacementCount > 0) {
          tempMaxLen++;
          replacementCount--;
        } else {
          break;
        }
      }

      right++;
    }

    let currLeft = left;
    while (currLeft >= 0) {
      if (currLeft === left) {
        currLeft--;
        continue;
      } else if (str[left] === str[currLeft]) {
        tempMaxLen++;
      } else {
        if (replacementCount > 0) {
          tempMaxLen++;
          replacementCount--;
        } else {
          break;
        }
      }

      currLeft--;
    }

    if (tempMaxLen > maxLen) {
      maxLen = tempMaxLen;
    }
  }

  return maxLen;
}

function findLongestRepeatingCharReplacementOptimal (str, k) {
  if (k >= str.length) {
    return str.length;
  }

  const charFreq = new Map();

  let mostFreqChar = 0;
  let maxLen = 0;
  let start = 0;
  let end = 0;

  while (end < str.length) {
    if (charFreq.has(str[end])) {
      charFreq.set(str[end], charFreq.get(str[end]) + 1);
    } else {
      charFreq.set(str[end], 1);
    }

    mostFreqChar = Math.max(mostFreqChar, charFreq.get(str[end]));

    // Do we have enough replacements to continue?
    const setNextWindow = (end - start + 1 - mostFreqChar) > k;

    if (setNextWindow) {
      charFreq.set(str[start], charFreq.get(str[start]) - 1);
      start++;
    }

    const length = end - start + 1;
    maxLen = Math.max(maxLen, length);
    end++;
  }

  return maxLen;
}

const testCases = [
  ['aabccbb', 2, 5], 
  ['fzfzfz', 6, 6],
  ['xxxxx', 1, 5],
  ['lmno', 2, 3],
  ['abab', 2, 4],
  ['dippitydip', 4, 6],
  ['roller', 2, 4],
  ['mbjhzdidgyzfmegqmabvdqjdlkzhqejjnwwarshmziqokbnalmtqjxzcpofgfjfembxdaubqmfjedchojpveyzlcyhjbyvlflmdizempazgrmsvxjyzrslamvszzukvrudzghrcmohoittwrjjdpyrfpexciuczivimdbgvddyrvhxtkrlpixifovlvgawpslhyiuqypdckfvyincjkliskzsofckfjqitirvmzevxmtgkpkylucrwqqtkltvtzuuyzgpyiudfftuhcpkykrlmhywwwoqfsxkjupbikymlzosythoboyomkebergpmajnwqxuarhssgweaziuyeppubxmnbqjsopfxvlzwaqdjxgledtppepakcqewlniiwkitoemvkxktcwrilnotrtwjiszvhfetnenxcvnczohlllwdeirjkkljjukzrgjnauupwkwijqxzaosryjrcojmxqyfrmokuuyywyotgywbujgugvtdbqdkuxtgoobximfixpgrktbcwdyyznlmibkdfbqbyrfwaegxceedbxoevioclgpmwclnxvnrwlftmfrzkdthrrdudqaiuxrclvukhonhwbxuvfrquvbylkkztyjbwihiztcowvzpcsvhowttljzgwmjynlmxhreepvmmgsofqpbzqmrhebztogfqvncmtrorvujcknvlyueixqwvvpiogecwqmfkqddazcwmyxdpaheupibmmhqhwtzvtxkumzwretgfidzfsttdsafvqfojvdemhaqovaczjwshaivysrmsinndvwstvfbjxcvqiwkaqfvzuxkrkguymuuazxopfotdphzowpngnmrmgvxmdvdycyniaunlviwpuvdhvhnngrfzfiqnjhsmeqemhzbtfaynupqcxggftgzvfwgdetzlxmraeytijttudiywbctrwikcjwcjqnaxmucqanjfffmbbuubhrgqnrsvvfqenbynbpiiptlwram' , 903
    , 952],
];

testCases.forEach(([s, k, expectedOutput]) => {
  // const result = findLongestRepeatingCharReplacementBrute(s, k);
  const result = findLongestRepeatingCharReplacementOptimal(s, k);
  const passed = result === expectedOutput;

  console.log({ s, k, expectedOutput, result, passed });
});