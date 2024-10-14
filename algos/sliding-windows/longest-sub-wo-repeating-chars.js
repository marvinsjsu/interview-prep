/**
 * Longest Substring without Repeating Characters
 * 
 * Given a string, str, return the length of the longest
 * substring without repeating characters.
 * 
 * 
 * Questions:
 * - What should we return if str is empty? return 0
 * - Will we need to consider case-sensitivity (do we treat A === a)? yes, case-sensitive
 * - Will we handle numbers and spaces? yes
 * - Do repeating characters have to be contiguous? no, the substring will have unique characters
 * - Find the length of the longest substring that contains unique characters? yes
 * 
 * Test-cases:
 * - "", 0
 * - "bbbbbb", 1
 * - "pwwkew", 3
 * - "conceptoftheday", 8
 * - "bbbbbbbbbbbbbbbbbb", 1
 * - "racecar", 4
 * - "bankrupted", 10 
 * 
 * Algos:
 * - brute-force (will use Sliding Window pattern with Hash Map):
 *      - "", returns 0
 *      - check if length of input string is 0, return 0
 *      - check if length of input string is 1, return 1
 *      - "bbbbbb", returns 1
 *      - use a Map to store character to their index in the string
 *      - set start pointer to 0
 *      - set end pointer to 0
 *      - set max length to 0
 *      - iterate each character in the string, we can use while-loop where we check if end pointer is still in-bounds:
 *          - if our end pointer's char is not yet in the map:
 *              - add it to the map and set its value to its index (end)
 *              
 *          - if our end pointer's char is in the map, this means a repeated character:
 *              - we need to check if the previous index of the repeated character is within the window:
 *                  - if so, then we need to slide the beginning of our window, to this index plus 1
 *                    (this is sliding our window so we can evaluate the characters in new window)
 *                  - we'll also update our map so the character's value is now the latest index (end)
 *                 
 *          - calculate the length of our window: (end - start + 1) - 1 = end - start ... end - start + 1
 *          - move our end pointer forward by one position, expanding our sliding window
 *                  
 *      - return max length
 * 
 * Trade-offs:
 *      - time-complexity: O(n), n = # of chars in string input
 *      - space-complexity: O(1), constant because the # of unique characters doesn't change
 * 
 */

/**
 * 
 * "bbbbbb", 1
 *  
 * - charFreq = {}
 * - maxLength = 0
 * - left = 0
 * - right = 0
 * 
 * while loop:
 * - right = 0
 * - currChar = "b"
 * - charFreq = {}
 * - charFreq = { "b": 1 }
 * - right = 1
 * 
 * ========================
 * - right = 1
 * - currChar = "b"
 * - length = (right - left) + 1 - (currChar frequency)
 *          = 1 - 0 + 1 - 1
 *          = 2 - 1
 *          = 1
 * 
 * ======================
 * ======================
 * 
 * "conceptoftheday", 8
 * 
 * - str.length = 16
 * - charFreq = {}
 * - start = 0
 * - end = 0
 * - maxLength = 0
 * 
 * while loop:
 * - end = 0
 * - currChar = "c"
 * - charFreq = { "c": 1 }
 * - end = 1
 * - length = end - start + 1 - char freq
 *          = 0 - 0 + 1 - 1
 *          = 0
 * - maxLength = 0
 * =======================
 * - end = 1
 * - currChar = "o"
 * - charFreq = { "c": 1, "o": 1 }
 * - end = 2
 * - length = 1 - 0 + 1 - 1
 *          = 1
 * - maxLength = 1
 * =======================
 * - end = 2
 * - currChar = "n"
 * - charFreq = { "c": 1, "o": 1, "n": 1 }
 * - end = 3
 * - length = 2 - 0 + 1 - 1
 *          = 2
 * - maxLength = 2
 * =======================
 * - end = 3
 * - currChar = "c"
 * - charFreq = { "c": 2, "o": 1, "n": 1 }
 * - charFreq = {}
 * - charFreq = { "c": 1 }
 * - start = 3
 * - end = 4
 * - length = 4 - 3 + 1 - 2
 *          = 0
 * - maxLength = 2
 * =======================
 * - end = 4
 * - currChar = "e"
 * - charFreq = { "c": 1, "e": 1 }
 * - start = 3
 * - end = 5
 * - length = 5 - 3 + 1 - 1
 *          = 3
 * - maxLength = 3
 * ======================
 * - end = 5
 * - currChar = "p"
 * - charFreq = { "c": 1, "e": 1, "p": 1 }
 * - start = 3
 * - end = 6
 * - length = 6 - 3 + 1 - 1
 *          = 3
 * - maxLength = 3
 * ======================
 * - end = 6
 * - currChar = "t"
 * - charFreq = { "c": 1, "e": 1, "p": 1, "t": 1 }
 * - start = 3
 * - end = 7
 * - length = 7 - 3 + 1 - 1
 *          = 4
 * - maxLength = 4
 * ======================
 * - end = 7
 * - currChar = "o"
 * - charFreq = { "c": 1, "e": 1, "p": 1, "t": 1, "o": 1 }
 * - start = 3
 * - end = 8
 * - length = 8 - 3 + 1 - 1
 *          = 5
 * - maxLength = 5
 * ======================
 * - end = 8
 * - currChar = "f"
 * - charFreq = { "c": 1, "e": 1, "p": 1, "t": 1, "o": 1, "f": 1 }
 * - start = 3
 * - end = 9
 * - length = 9 - 3 + 1 - 1
 *          = 6
 * - maxLength = 6
 * ======================
 * - end = 9
 * - currChar = "t"
 * - charFreq = { "c": 1, "e": 1, "p": 1, "t": 2, "o": 1, "f": 1 }
 * - charFreq = {}
 * - charFreq = { "t": 1 }
 * - start = 9
 * - end = 10
 * - length = 10 - 9 + 1 - 1
 *          = 1
 * - maxLength = 6
 * 
 */


function findLongestSubstringNoRepeatOptimal (str) {
    if (str.length <= 1) {
        return str.length;
    }

    const charFreq = new Map();

    let start = 0;
    let end = 0;
    let maxLength = 0;

    while (end < str.length) {
        const currChar = str[end];
        if (charFreq.has(currChar) && charFreq.get(currChar) >= start) {
            start = charFreq.get(currChar) + 1;
            charFreq.set(currChar, end);
        } else {
            charFreq.set(currChar, end);
        }

        const length = end - start + 1;
        maxLength = Math.max(maxLength, length);
        end++;
    }

    return maxLength;
}

const testCases = [
    ["", 0], 
    ["bbbbbb", 1],
    ["pwwkew", 3],
    ["conceptoftheday", 8],
    ["bbbbbbbbbbbbbbbbbb", 1],
    ["racecar", 4],
    ["bankrupted", 10]
];

testCases.forEach(([str, expectedOutput]) => {
    const result = findLongestSubstringNoRepeatOptimal(str);
    const passes = result === expectedOutput;

    console.log({ str, expectedOutput, result, passes });
});

