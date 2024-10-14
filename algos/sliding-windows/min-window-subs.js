/**
 * Minimum Window Subsequences
 * 
 * Given two strings, str1 and str2, find the shortest substring in str1
 * such that str2 is a subsequence of that substring.
 * 
 * A substring is defined as a contiguous sequence of characters within
 * a string. A subsequence is a sequence that can be derived from
 * another sequence by deleting zero or more elements without
 * changing the order of the remaining elements.
 * 
 * Let’s say you have the following two strings:
 * 
 * str1 = “abbcb”
 * str2 = “ac”
 * 
 * In this example, “abbc” is a substring of str1, from which we can
 * derive str2 simply by deleting both the instances of the
 * character b. Therefore, str2 is a subsequence of this
 * substring. Since this substring is the shortest among
 * all the substrings in which str2 is present as a
 * subsequence, the function should return this
 * substring, that is, “abbc”.
 */

/**
 * Questions:
 * - If str1 is shorter than str2, what should we return? ""
 * - If str2 is an empty string, what should we return? ""
 * - If str1 is an empty string, what should we return? ""
 * 
 * Test cases:
 * - "abbcb", "ac", "abbc"
 * - "abcdebdde", "bde", "bcde"
 * - "abcdebdde", "bdf", ""
 * 
 * Algos:
 * - brute-force approach:
 *      -
 * 
 * Tradeoffs:
 * - brute-force approach:
 *      - time-complexity: O(n^2)
 *      - space-complexity: O(1)
 * 
 * - Sliding Windows approach:
 *      - time-complexity: O(nm), n = length of str1, m = length of str2
 *      - space-complexity: O(1)
 */


/**
 * 
 * "abbcb", "ac"
 * 
 * "abcdebdde", "bde", "bcde"
 * 
 * - size of window is based on str2
 * - set startIndex1 at str1's 0
 * - set endIndex1 at startIndex1 + str2.length
 * - set startIndex2 at str2's 0
 * - first loop is dedicated to finding the index in str1
 *   where the first character of str2 matches:
 *      - loop through str1 characters:
 *          - if str1[startIndex1] !== str2[startIndex2]:
 *              - increment startIndex1
 * 
 * - if startIndex1 >= str1.length, return ""
 * 
 * 
 * - loop through each character in str2:
 *      - if str1[endIndex1] === str2[startIndex2]:
 *          - increment endIndex1 by a position
 *          - increment startIndex2 by a position
 *      - else:
 *          - increment endIndex1 by a position
 *          
 * - if endIndex1 >= str1.length return ""
 *  
 * - return str1[startIndex1] to str1[endIndex1]
 */

function findMinWindowSubsBrute (str1, str2) {
    if (str1.length < str2.length) {
        return "";
    }

    if (str1.length === 0 || str2.length === 0) {
        return "";
    }

    let minSub = str1;
    let foundSubsequence = false;
    let windowStart = 0;

    while (windowStart < str1.length) {
        let startStr1Idx = windowStart;
        let currStr2Idx = 0;
        while (startStr1Idx < str1.length) {
            if (str1[startStr1Idx] !== str2[currStr2Idx]) {
                startStr1Idx++;
            } else {
                break;
            }
        }

        if (windowStart === 0 && startStr1Idx === str1.length) {
            return "";
        }

        let endStr1Idx = startStr1Idx + 1;
        currStr2Idx++;

        while (currStr2Idx < str2.length && endStr1Idx < str1.length) {
            if (str1[endStr1Idx] === str2[currStr2Idx]) {
                endStr1Idx++;
                currStr2Idx++;
            } else {
                endStr1Idx++;
            }
        }

        if (currStr2Idx !== str2.length) {
            windowStart++;
            break;
        }

        let output = '';

        for (let i = startStr1Idx; i < endStr1Idx; i++) {
            output += str1[i];
        }

        foundSubsequence = true;

        if (output.length < minSub.length) {
            minSub = output;
        }

        windowStart++;
    }

    return foundSubsequence ? minSub : "";
}

function findMinWindowSubsBetter (str1, str2) {
    let str1Length = str1.length;
    let str2Length = str2.length;

    let minSubLength = Infinity;

    let str1Idx = 0;
    let str2Idx = 0;
    let start = 0;
    let minSubsequence = "";

    while (str1Idx < str1Length) {
        if (str1[str1Idx] === str2[str2Idx]) {
            if (str2Idx === 0) {
                start = str1Idx;
            }

            str2Idx++;

            if (str2Idx === str2Length) {
                const end = str1Idx;
                const length = end - start + 1;

                if (length < minSubLength) {
                    minSubsequence = str1.substring(start, end + 1);
                    minSubLength = length;
                }

                str1Idx = start;
                str2Idx = 0;
            }
        }

        str1Idx++;
    }


    return minSubsequence;
}

function findMinWindowSubsOptimal (str1, str2) {
    const str1Length = str1.length;
    const str2Length = str2.length;

    let minSubLength = Infinity;
    let minSubsequence = "";

    let str1Idx = 0;
    let str2Idx = 0;

    while (str1Idx < str1Length) {

        if (str1[str1Idx] === str2[str2Idx]) {

            str2Idx++;

            if (str2Idx === str2Length) {
                let start = str1Idx;
                let end = str1Idx;

                str2Idx--;

                while (str2Idx >= 0) {
                    if (str1[start] === str2[str2Idx]) {
                        str2Idx--;
                    }

                    start--;
                }

                start++;

                const length = end - start + 1;

                if (length < minSubLength) {
                    minSubLength = length;
                    minSubsequence = str1.substring(start, end + 1);
                }

                str1Idx = start;
                str2Idx = 0;
            }
        }

        str1Idx++;
    }

    return minSubsequence;
}

const testCases = [
    ["abbcb", "ac", "abbc"],
    ["abcdebdde", "bde", "bcde"], 
    ["abcdebdde", "bdf", ""],
    ["abcdbebe" , "bbe", "bebe"],
    ["afgegrwgwga" , "aa", "afgegrwgwga"],
];

testCases.forEach(([str1, str2, expectedOutput]) => {
    // const result = findMinWindowSubsBrute(str1, str2);
    // const result = findMinWindowSubsBetter(str1, str2);
    const result = findMinWindowSubsOptimal(str1, str2);
    const passes = result === expectedOutput;

    console.log({ str1, str2, expectedOutput, result, passes });
});
