/**
 * Questions:
 * - can we expect all inputs to be integers?
 * 
 * Testcases:
 * - num = 24, output = 20
 * - num = 8, output = 64
 * - num = 12, output = 5
 * 
 * Algos:
 * 
 * Tradeoffs:
 * 
 */

function sumSquaredDigits (num, sum = 0) {
  if (num == 0) {
    return sum;
  }

  let lastDigit = num % 10;
  let remainingDigits = Math.floor(num / 10);
  sum += (lastDigit * lastDigit);

  return sumSquaredDigits(remainingDigits, sum);
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
