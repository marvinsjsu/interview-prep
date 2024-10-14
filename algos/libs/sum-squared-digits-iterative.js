

function sumSquaredDigits (num) {
    let sum = 0;

    while (num > 0) {
        let lastDigit = num % 10;
        num = Math.floor(num / 10);
        sum += lastDigit ** 2;
    }

    return sum;
}

const testCases = [
    [24, 20], 
    [8, 64],
    [12, 5],
];

testCases.forEach(([num, expectedOutput]) => {
    const result = sumSquaredDigits(num);
    const passes = result === expectedOutput;

    console.log({ num, expectedOutput, result, passes });
});
