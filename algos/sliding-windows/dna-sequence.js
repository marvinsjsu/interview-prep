/**
 * DNA Sequence
 * 
 * Given a string, dna, that represents a DNA subsequence, and a number k,
 * return all the contiguous subsequences (substrings) of length k that
 * occur more than once in the string. The order of the returned 
 * subsequences does not matter. If no repeated substring is 
 * found, the function should return an empty set.
 * 
 * Questions:
 * - What should we return if input DNA has less elements than k?
 * - 
 * 
 * Test-cases:
 * - "GAGTCACAGTAGTTTCA", 3, ["AGT", "TCA"]
 * - "CAAACCCCGTAAACCCCA", 7, ["AAACCCC"]
 * 
 * Algos:
 * - brute-force:
 *      - iterate through each character in the string:
 *          - get substring beginning at character to two continiguous characters
 *          - use an object or Map, store substring as key and occurence as value
 *      - go through each key in object and push to list whenever occurrence is
 *        greater than 1
 *      - return list
 * 
 * - use Sliding Window Strategy:
 *      - use a Set to store substrings
 *      - iterate through each character in the string:
 *          - set start ptr to the index of current character
 *          - set end ptr to k positions ahead of start ptr
 *          - use while loop to build substr from start to end (exclusive)
 *          - check object or Map if substring exists:
 *              - if not, add key and value (as 1)
 *              - if so, add substring to Set
 *      - return Set
 * 
 * Tradeoffs:
 * - brute-force:
 *      - time-complexity: O(n^2) + O(n) => O(n^2), n = number of characters in dna
 *      - space-complexity: O(n/k) => O(n), k = length of substring
 * 
 * - 
 */ 

function getDNASubsBrute (dna, k) {
    const subsequences = {};

    let i = 0;
    while (i < dna.length - 2) {
        const end = i + k;
        const substr = dna.slice(i, end);

        if (subsequences[substr]) {
            subsequences[substr] = subsequences[substr] + 1;
        } else {
            subsequences[substr] = 1;
        }
        
        i++;
    }

    return Object.entries(subsequences)
        .filter(([_, occurences]) => occurences > 1)
        .map(([substr, _]) => substr);
}

function getDNASubsOptimal (dna, k) {
    const substrings = new Set();
    const output = [];

    let i = 0;

    while (i <= dna.length - k) {
        let start = i;
        let end = start + k;
        let substr = '';

        while (start < end) {
            substr += dna[start];
            start++;
        }

        if (!substrings.has(substr)) {
            substrings.add(substr);
        } else {
            output.push(substr);
        }   

        i++;
    }

    return new Set(output);
}


function getDNASubsBrute2 (dna, k) {
    if (k > dna.length) {
        return [];
    }

    const subs = [];
    const map = new Map();

    let start = 0;

    while (start <= dna.length - k) {
        const end = start + k;
        const subStr = dna.slice(start, end);

        if (map.has(subStr)) {
            subs.push(subStr);
        } else {
            map.set(subStr, 1);
        }

        start++;
    }

    return subs;
}


const testCases = [
    ["GAGTCACAGTAGTTTCA", 3, ["AGT", "TCA"]],
    ["CAAACCCCGTAAACCCCA", 7, ["AAACCCC"]],
];

testCases.forEach(([dna, k, expectedOutput]) => {
    // const result = getDNASubsBrute(dna, k);
    // const result = getDNASubsOptimal(dna, k);
    const result = getDNASubsBrute2(dna, k);
    
    let isEqual = true;

    expectedOutput.forEach(expected => {
        if (Array.isArray(result) && !result.includes(expected)) {
            isEqual = false;
        }
    });

    console.log({ dna, k, expectedOutput, result, isEqual });
});