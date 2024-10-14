/**
 * Questions:
 * - what should we return for an empty string? true
 * - how about for string with 1 character? true
 * - how about a string with 2 characters? true
 * 
 * Algos:
 * - use two-pointer strategy:
 *    - set mismatch counter to 0
 *    - set start ptr at 0
 *    - set end ptr at last element of input string
 *    - iterate using while loop (start < end):
 *         - check if start element === end element:
 *            - if not, check if mismatch === 1:
 *                - if not, move start ptr one position forward and continue
 *                - else return false
 *            - if matches:
 *                - move start ptr one position forward
 *                - move end ptr on position backward
 *    - return true
 * 
 * Tradeoffs:
 * 
 * Tests:
 * 
 * ['', true]
 * ['a', true]
 * ['aa', true]
 * ['ae', true]
 * ['aba', true]
 * ['abab', true]
 * ['aabb', false]
 */

// m, a, d, a, m, e

// mismatch = 0

function helper (str, moveStart = true) {
    let start = 0;
    let end = str.length - 1;
    let mismatchCount = 0;

    while (start < end) {
        if (str[start] === str[end]) {
            start++;
            end--;
        } else {
            if (mismatchCount === 1) {
                return false;
            }

            mismatchCount++;

            if (moveStart) {
                start++;
            } else {
                end--;
            }
        }
    }

    return true;
}

function isPalindrome (string) {
    return helper(string) || helper(string, false);
}


const testCases = [
    ['', true],
    ['a', true],
    ['aa', true],
    ['ae', true],
    ['aba', true],
    ['abab', true],
    ['aabb', false],
    ['madame', true],
];

testCases.forEach(([input, expectedOutput]) => {
    const result = isPalindrome(input);
    const isEqual = result === expectedOutput;
    
    console.log({ input, expectedOutput, result, isEqual });
});