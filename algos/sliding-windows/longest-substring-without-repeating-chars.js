/**
 * Longest substring without repeating characters:
 * Given a string, find the length of the longest substring without repeating characters.
 * 
 * Questions:
 * - What should we return when string is empty? return 0
 * - What if we have a string like "aaa"? return 1
 * 
 * Test-cases:
 * "abcdbea", 
 * 
 * Algos:
 * - brute-force:
 *      - use a Set to keep track of unique characters
 * 
 * Tradeoffs:
 * 
 * 
 */

/**
 * str = "aaa"
 * 
 * initializations:
 * - maxLength = 0
 * - start = 0
 * - end = 0
 * - hash = {}
 * 
 * inside while-loop:
 * - loop 1:
 *      - start = 0
 *      - end = 0
 *      - curr = "a"
 *      - hash = { a: 0 }
 *      - start = 0
 *      - end = 1
 * 
 * - loop 2:
 *      - start = 0
 *      - end = 1
 *      - curr = "a"
 *      - hash[curr] is 0
 *      - length = end - start = 1
 *      - maxLength = 1
 *      - start = 1
 *      - end = 2
 *      - hash = { a: 1 }
 * 
 * - loop 3:
 *      - start = 1
 *      - end = 2
 *      - curr = "a"
 *      - hash[curr] is 1
 *      - length = end - start = 1
 *      - start = 2
 *      - hash = { a: 2 }
 *      - end = 3
 * 
 * - lastSubstringLength = 3 - 2
 */

function longestSubstringOptimal (str) {
    const map = new Map();

    let maxLength = 0;
    let start = 0;
    let end = 0;

    while (end < str.length) {
        curr = str[end];

        if (map.has(curr) && map.get(curr) >= start) {
            const length = end - start;

            if (length > maxLength) {
                maxLength = length;
            }

            start = map.get(curr) + 1;
            map.set(curr, end);
        } else {
            map.set(curr, end);
        }

        end++;
    }

    const lastSubstringLength = end - start;

    return lastSubstringLength > maxLength
        ? lastSubstringLength
        : maxLength;
}

const testCases = [
    ["abcdbeaff", 6],
    ["abcdbea", 5],
    ["aaa", 1],
    ["abc", 3],
    ["", 0], 
];

testCases.forEach(([str, expectedOutput]) => {
    const result = longestSubstringOptimal(str);
    const passed = expectedOutput === result;

    console.log({ str, expectedOutput, result, passed });
});