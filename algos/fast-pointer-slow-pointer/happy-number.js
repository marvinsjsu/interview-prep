/**
 * 
 * Questions:
 * - will our input always be an integer?
 * 
 * Test-cases:
 *   n = 28, true
 *   n = 4, false
 * 
 * Algos:
 * 
 * Tradeoffs:
 *  - space-complexity:
 *  - time-complexity:
 */

function isHappyNumber(n) {
    let slowPointer = n;
    let fastPointer = helper(slowPointer);

    while (fastPointer !== 1 && fastPointer !== slowPointer ) {
        slowPointer = helper(slowPointer);
        fastPointer = helper(helper(fastPointer));
    }

    return fastPointer === 1;
}


function helper(n) {
    const digits = n.toString().split('');

    let sum = 0;
    let i = 0;

    while (i < digits.length) {
        sum += digits[i] * digits[i];
        i++;
    }

    return sum;
}


const testCases = [
    [28, true],
    [4, false],
    [2147483646, false],
    [1, true],
    [19, true],
    [8, true],
    [7, true],
];

testCases.forEach(([n, expectedOutput]) => {
    const result = isHappyNumber(n);
    const passes = result === expectedOutput;

    console.log({ n, expectedOutput, result, passes });
});
